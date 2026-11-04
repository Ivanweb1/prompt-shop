type PreviewArtProps = {
  eyebrow: string;
  result: string;
  index?: number;
  dark?: boolean;
};

export function PreviewArt({ eyebrow, result, index = 1, dark = false }: PreviewArtProps) {
  return (
    <div className={`preview-art ${dark ? "preview-dark" : ""}`}>
      <div className="preview-top"><span>{eyebrow}</span><span>{String(index).padStart(2, "0")}</span></div>
      <div className="preview-modules" aria-hidden>
        <i /><i /><i /><i /><i />
      </div>
      <div className="preview-result">{result}</div>
    </div>
  );
}
