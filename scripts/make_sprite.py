#!/usr/bin/env python3
import io
import os
from typing import List

from PIL import Image, ImageOps
from rembg import remove

WORKSPACE = "/workspace"
SRC_IMAGES = [
    f"{WORKSPACE}/public/images/dog1.jpg",
    f"{WORKSPACE}/public/images/dog2.jpg",
    f"{WORKSPACE}/public/images/dog3.jpg",
    f"{WORKSPACE}/public/images/dog4.jpg",
]
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


def process_sources(sources: List[str]) -> List[str]:
    ensure_dir(FRAMES_DIR)
    frame_paths: List[str] = []
    frame_index = 1
    for src in sources:
        if not os.path.exists(src):
            log(f"skip missing: {src}")
            continue
        log(f"remove background: {os.path.basename(src)}")
        rgba = remove_background_to_rgba(src)
        frame = make_square_frame(rgba, FRAME_SIZE, CONTENT_SCALE)
        out_path = os.path.join(FRAMES_DIR, f"frame{frame_index}.png")
        frame.save(out_path, "PNG")
        frame_paths.append(out_path)
        log(f"wrote {out_path}")
        frame_index += 1
        if frame_index > 4:
            break
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


def main() -> None:
    frames = process_sources(SRC_IMAGES)
    if len(frames) < 4:
        log("warning: fewer than 4 frames found; composing with available frames")
    compose_sprite(frames, SPRITE_SHEET_PATH, FRAME_SIZE)


if __name__ == "__main__":
    main()
