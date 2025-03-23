import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top face */}
          <path
            d="M50 5L87.5 25L50 45L12.5 25L50 5Z"
            fill="#7C3CD7"
            stroke="#9C4DFF"
            strokeWidth="1"
          />

          {/* Front face */}
          <path
            d="M50 45L87.5 25V75L50 95V45Z"
            fill="#9C4DFF"
            stroke="#9C4DFF"
            strokeWidth="1"
          />

          {/* Right face */}
          <path
            d="M50 45L12.5 25V75L50 95V45Z"
            fill="#6434B4"
            stroke="#9C4DFF"
            strokeWidth="1"
          />

          {/* Circuit nodes */}
          <circle cx="50" cy="5" r="2" fill="#FFFFFF" />
          <circle cx="87.5" cy="25" r="2" fill="#FFFFFF" />
          <circle cx="87.5" cy="75" r="2" fill="#FFFFFF" />
          <circle cx="50" cy="95" r="2" fill="#FFFFFF" />
          <circle cx="12.5" cy="75" r="2" fill="#FFFFFF" />
          <circle cx="12.5" cy="25" r="2" fill="#FFFFFF" />
          <circle cx="50" cy="45" r="2" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
