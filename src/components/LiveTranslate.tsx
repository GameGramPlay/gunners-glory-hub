import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: object, el: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "de", label: "DE" },
  { code: "pt", label: "PT" },
  { code: "it", label: "IT" },
  { code: "ja", label: "JA" },
];

export function LiveTranslate() {
  const mounted = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false, layout: 0 },
        "google_translate_element",
      );
      setReady(true);
    };
    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  const translate = (code: string) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (!select) return;
    select.value = code;
    select.dispatchEvent(new Event("change"));
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Live translate:</span>
      <div className="flex flex-wrap gap-1">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => translate(l.code)}
            disabled={!ready}
            className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-white/25 disabled:opacity-40"
            aria-label={`Translate page to ${l.label}`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div id="google_translate_element" className="sr-only" aria-hidden />
    </div>
  );
}
