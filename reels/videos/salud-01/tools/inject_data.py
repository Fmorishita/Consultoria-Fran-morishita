"""Inyecta assets/audio/vo_timeline.json dentro de index.html (marcadores VO_DATA)."""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
data = json.load(open(root / "assets/audio/vo_timeline.json"))
compact = {"total": data["total"], "segments": [
    {"id": s["id"], "start": s["start"], "end": s["end"],
     "words": [{"text": w["text"], "start": w["start"], "end": w["end"]} for w in s["words"]]}
    for s in data["segments"]]}
html = (root / "index.html").read_text()
blob = json.dumps(compact, ensure_ascii=False, separators=(",", ":"))
html = re.sub(r"/\*VO_DATA_START\*/.*?/\*VO_DATA_END\*/", lambda m: "/*VO_DATA_START*/" + blob + "/*VO_DATA_END*/", html, flags=re.S)
(root / "index.html").write_text(html)
print("ok", len(blob), "bytes")
