import { useState } from "react";

export default function CopyDiv() {
  const [copied, setCopied] = useState(false);
  const email = "peterschultzjohansen@live.dk";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    });
  };

  return (
    <div
      onClick={handleCopy}
      className="relative flex items-center justify-center min-h-[19rem] cursor-pointer select-none p-4 transition"
    >
      <div className="space-y-2 text-center">
        {Array.from({ length: 7 }).map((_, i) => (
          <p key={i}>{email}</p>
        ))}
      </div>

      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <p className="text-gray-700 ">Copied!</p>
        </div>
      )}
    </div>
  );
}
