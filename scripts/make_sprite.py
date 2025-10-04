#!/usr/bin/env python3
import io
import os
import argparse
from typing import List, Tuple

from PIL import Image, ImageOps
from rembg import remove

WORKSPACE = "/workspace"
# Default single source image (can be overridden via CLI)
SOURCE_IMAGE = f"{WORKSPACE}/public/images/dog1.jpg"
FRAMES_DIR = f"{WORKSPACE}/public/images/dog_run_frames"
SPRITE_SHEET_PATH = f"{WORKSPACE}/public/images/dog_run_4x.png"
FRAME_SIZE = 256
CONTENT_SCALE = 0.9  # scale dog to 90% of frame for padding


def log(msg: str) -> None:
    print(f"[sprite] {msg}")


def ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def remove_background_to_rgba(img_path: str) -> Image.Image:
    """Remove background using rembg and return RGBA PIL image."""
    with open(img_path, "rb") as f:
        data = f.read()
    out_bytes = remove(data)
    out_img = Image.open(io.BytesIO(out_bytes)).convert("RGBA")
    return out_img


def make_square_frame(img: Image.Image, size: int, scale: float) -> Image.Image:
    """Place the image centered on a transparent square canvas of given size."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    target_w = int(size * scale)
    target_h = int(size * scale)
    fitted = ImageOps.contain(img, (target_w, target_h))
    x = (size - fitted.width) // 2
    y = (size - fitted.height) // 2
    canvas.paste(fitted, (x, y), fitted)
    return canvas


def transform(img: Image.Image, angle: float = 0.0, translate: Tuple[int, int] = (0, 0), scale: float = 1.0) -> Image.Image:
    """Apply simple rotation, scaling and translation to an RGBA image."""
    if scale != 1.0:
        new_w = max(1, int(img.width * scale))
        new_h = max(1, int(img.height * scale))
        img = img.resize((new_w, new_h), resample=Image.BICUBIC)
    if angle != 0:
        img = img.rotate(angle, resample=Image.BICUBIC, expand=True)
    # paste onto a minimally large transparent canvas to apply translation later
    canvas = Image.new("RGBA", (img.width + abs(translate[0]) + 8, img.height + abs(translate[1]) + 8), (0, 0, 0, 0))
    off_x = max(4, 4 + translate[0])
    off_y = max(4, 4 + translate[1])
    canvas.paste(img, (off_x, off_y), img)
    return canvas


def process_single_source(src: str) -> List[str]:
    """Create 4 animation frames from a single source by subtle transforms."""
    ensure_dir(FRAMES_DIR)
    if not os.path.exists(src):
        raise SystemExit(f"Source image not found: {src}")
    log(f"remove background: {os.path.basename(src)}")
    rgba = remove_background_to_rgba(src)

    # Create 4 variants to simulate a light running bounce cycle
    variants: List[Image.Image] = [
        transform(rgba, angle=-2, translate=(-6, 2), scale=0.98),
        transform(rgba, angle=0, translate=(6, -4), scale=1.00),
        transform(rgba, angle=2, translate=(-4, -2), scale=0.98),
        transform(rgba, angle=0, translate=(4, -4), scale=1.00),
    ]

    frame_paths: List[str] = []
    for i, variant in enumerate(variants, start=1):
        frame = make_square_frame(variant, FRAME_SIZE, CONTENT_SCALE)
        out_path = os.path.join(FRAMES_DIR, f"frame{i}.png")
        frame.save(out_path, "PNG")
        frame_paths.append(out_path)
        log(f"wrote {out_path}")
    return frame_paths


def compose_sprite(frames: List[str], output_path: str, size: int) -> None:
    if not frames:
        raise SystemExit("No frames to compose")
    cols = len(frames)
    sheet = Image.new("RGBA", (size * cols, size), (0, 0, 0, 0))
    for i, fp in enumerate(frames):
        img = Image.open(fp).convert("RGBA")
        sheet.paste(img, (i * size, 0), img)
    sheet.save(output_path, "PNG")
    log(f"sprite sheet saved: {output_path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a 4-frame running sprite from a single image")
    parser.add_argument("--src", default=SOURCE_IMAGE, help="Path to source image (single)")
    parser.add_argument("--size", type=int, default=FRAME_SIZE, help="Frame size (square)")
    parser.add_argument("--out", default=SPRITE_SHEET_PATH, help="Output sprite sheet path")
    parser.add_argument("--frames-dir", default=FRAMES_DIR, help="Directory to write individual frames")
    parser.add_argument("--scale", type=float, default=CONTENT_SCALE, help="Content scale within each frame (0..1)")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    global FRAME_SIZE, SPRITE_SHEET_PATH, FRAMES_DIR, CONTENT_SCALE
    FRAME_SIZE = args.size
    SPRITE_SHEET_PATH = args.out
    FRAMES_DIR = args.frames_dir
    CONTENT_SCALE = args.scale
    frames = process_single_source(args.src)
    compose_sprite(frames, SPRITE_SHEET_PATH, FRAME_SIZE)


if __name__ == "__main__":
    main()
