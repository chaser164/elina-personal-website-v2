from PIL import Image
import sys

def image_to_black_white_bitmap(input_path, output_path='output_bitmap.png', threshold=128):
    # Open the image
    image = Image.open(input_path).convert('L')  # Convert to grayscale

    # Apply threshold to convert to black & white
    bw = image.point(lambda x: 0 if x < threshold else 255, mode='1')

    # Save as black & white bitmap
    bw.save(output_path)
    print(f"Black and white bitmap saved as {output_path}")

# Example usage:
# Pass image path as argument or hardcode below
if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python script.py <input_image> [output_image] [threshold]")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) >= 3 else 'output_bitmap.png'
        thresh = int(sys.argv[3]) if len(sys.argv) >= 4 else 128
        image_to_black_white_bitmap(input_file, output_file, threshold=thresh)
