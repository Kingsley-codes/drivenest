"use client";

export default function TestVideoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-3xl aspect-video bg-gray-800 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dbeyl29fl/video/upload/lsntidemkzy6x1bpzpio.mp4"
        />
      </div>
    </main>
  );
}
