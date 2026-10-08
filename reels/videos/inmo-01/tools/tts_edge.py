import sys, asyncio, json, certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts
from edge_tts import communicate as _c
try:
    import ssl
    _c._SSL_CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt")
except Exception: pass

# TTS_LANG=es-MX: fuerza el idioma de la voz multilingüe (evita que cambie a acento americano en nombres propios)
import os
_LANG = os.environ.get("TTS_LANG")
if _LANG:
    _orig = _c.mkssml
    def _mk(tc, escaped_text):
        x = _orig(tc, escaped_text).replace("xml:lang='en-US'", f"xml:lang='{_LANG}'")
        if os.environ.get("TTS_LANG_TAG", "1") == "1":
            x = x.replace("<prosody", f"<lang xml:lang='{_LANG}'><prosody", 1).replace("</prosody>", "</prosody></lang>", 1)
        return x
    _c.mkssml = _mk

async def main(voice, rate, pitch, text, out, subs):
    c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary="WordBoundary")
    words=[]
    with open(out,"wb") as f:
        async for ch in c.stream():
            if ch["type"]=="audio": f.write(ch["data"])
            elif ch["type"]=="WordBoundary":
                words.append({"text":ch["text"],"start":ch["offset"]/1e7,"end":(ch["offset"]+ch["duration"])/1e7})
    if subs: json.dump(words, open(subs,"w"), ensure_ascii=False, indent=1)
voice, rate, pitch, textfile, out = sys.argv[1:6]
subs = sys.argv[6] if len(sys.argv)>6 else None
text=open(textfile).read().strip()
asyncio.run(main(voice, rate, pitch, text, out, subs))
