export function LetterPreview() {
  return (
    <div className="w-full h-full flex align-items-center justify-content-center p-2">
      <div 
        className="bg-white shadow-4"
        style={{
          aspectRatio: "1 / 1.414",
          maxHeight: "100%",
          maxWidth: "100%",
          width: "auto",
          height: "auto"
        }}
      >
        {/* Placeholder content for DIN A4 page */}
        <div className="w-full h-full flex align-items-center justify-content-center text-400">
          Vorschau (DIN A4)
        </div>
      </div>
    </div>
  );
}
