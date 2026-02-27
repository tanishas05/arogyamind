import { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

function PostureDetector() {
  const videoRef = useRef(null);
  const [postureStatus, setPostureStatus] = useState("Good");

  useEffect(() => {
    if (!videoRef.current) return;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!results.poseLandmarks) return;

      const lm = results.poseLandmarks;

      const shoulder = lm[11];
      const hip = lm[23];
      const knee = lm[25];

      const ABx = shoulder.x - hip.x;
      const ABy = shoulder.y - hip.y;

      const CBx = knee.x - hip.x;
      const CBy = knee.y - hip.y;

      const dot = ABx * CBx + ABy * CBy;
      const magAB = Math.sqrt(ABx * ABx + ABy * ABy);
      const magCB = Math.sqrt(CBx * CBx + CBy * CBy);

      if (magAB === 0 || magCB === 0) return;

      let cosine = dot / (magAB * magCB);
      cosine = Math.max(-1, Math.min(1, cosine));

      const angle = Math.acos(cosine) * (180 / Math.PI);

      const newStatus = angle < 155 ? "Slouching" : "Good";

      setPostureStatus((prev) =>
        prev !== newStatus ? newStatus : prev
      );
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Posture Camera</h3>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "500px",
          borderRadius: "12px",
          transform: "scaleX(-1)"
        }}
      />

      <div
        style={{
          marginTop: "12px",
          padding: "10px 18px",
          borderRadius: "20px",
          display: "inline-block",
          fontWeight: "bold",
          color: "white",
          backgroundColor:
            postureStatus === "Good" ? "#16a34a" : "#dc2626",
        }}
      >
        {postureStatus === "Good"
          ? "✅ Good Posture"
          : "❌ Slouching"}
      </div>
    </div>
  );
}

export default PostureDetector;