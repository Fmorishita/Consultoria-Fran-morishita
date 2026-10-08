"""Retratos de doctores FICTICIOS con Realistic Vision 5.1 (CreativeML OpenRAIL-M) + LCM-LoRA (OpenRAIL++) + VAE ft-mse (MIT). CPU."""
import sys, os, torch, time
from diffusers import StableDiffusionPipeline, AutoencoderKL, LCMScheduler
OUT = sys.argv[1]; only = sys.argv[2:] 
os.makedirs(OUT, exist_ok=True)
torch.set_num_threads(4)
vae = AutoencoderKL.from_pretrained("stabilityai/sd-vae-ft-mse", torch_dtype=torch.float32)
pipe = StableDiffusionPipeline.from_pretrained("SG161222/Realistic_Vision_V5.1_noVAE", vae=vae, torch_dtype=torch.float32, safety_checker=None, requires_safety_checker=False)
pipe.scheduler = LCMScheduler.from_config(pipe.scheduler.config)
pipe.load_lora_weights("latent-consistency/lcm-lora-sdv1-5"); pipe.fuse_lora()
BASE = "RAW photo, editorial portrait, {d}, looking at camera, upper body, head in upper third, sharp focus on face, natural skin texture, cinematic warm gold rim light, dark moody premium background, plain unbranded white coat, dslr"
NEG = "text, letters, embroidery, name tag, badge, writing, watermark, logo, signature, cartoon, anime, 3d render, painting, deformed, bad anatomy, extra fingers, mutated hands, blurry, lowres, disfigured, cross-eyed, patient, blood, surgery"
DOCS = {
 "cirujano-plastico": ("handsome hispanic male plastic surgeon, 45 years old, short dark hair, navy blue surgical scrubs under white doctor coat, arms crossed, luxury aesthetic clinic", 11),
 "implantologa": ("beautiful latina female dentist, 35 years old, dark hair in a bun, white doctor coat over black top, holding a dental mirror, modern premium dental office", 22),
 "bariatra": ("mexican male surgeon, 52 years old, grey temples, teal surgical scrubs and surgical cap, stethoscope around neck, upscale hospital corridor", 33),
 "dermatologa": ("elegant latina female dermatologist, 42 years old, long brown hair, white doctor coat, holding a tablet, upscale medical spa", 44),
 "oftalmologo": ("young hispanic male ophthalmologist, 34 years old, glasses, white doctor coat, modern eye clinic with ophthalmic equipment", 55),
 "ortodoncista": ("smiling latina female orthodontist, 32 years old, white doctor coat, holding clear dental aligners, bright luxury dental clinic", 66),
}
for k, (d, seed) in DOCS.items():
    if only and k not in only: continue
    for v in range(2):
        t = time.time()
        g = torch.Generator().manual_seed(seed + v * 100)
        img = pipe(BASE.format(d=d), negative_prompt=NEG, num_inference_steps=6, guidance_scale=1.5, width=512, height=768, generator=g).images[0]
        img.save(os.path.join(OUT, f"{k}_v{v}.png")); print(k, v, round(time.time() - t, 1), "s", flush=True)
