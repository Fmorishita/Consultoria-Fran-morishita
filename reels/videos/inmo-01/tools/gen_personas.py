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
BASE = "RAW photo, editorial portrait, {d}, looking at camera, upper body, head in upper third, sharp focus on face, natural skin texture, cinematic warm gold rim light, premium moody atmosphere, dslr"
NEG = "text, letters, words, logo, sign, signage, watermark, signature, brand, name tag, badge, writing, cartoon, anime, 3d render, painting, deformed, bad anatomy, extra fingers, mutated hands, blurry, lowres, disfigured, cross-eyed"
DOCS = {
 "desarrollador": ("confident hispanic male real estate developer, 48 years old, white hard hat in hand, navy blazer over white shirt, standing at a modern high-rise construction site at golden hour, cranes blurred in background", 101),
 "directora-comercial": ("elegant latina female sales director of a real estate development company, 40 years old, black blazer, arms crossed, luxury condo sales gallery with architectural scale model blurred behind", 202),
 "broker": ("successful mexican male real estate broker, 38 years old, tailored grey suit, holding house keys, modern luxury penthouse with ocean view window in background", 303),
 "asesora": ("smiling latina female real estate agent, 30 years old, white blouse and beige blazer, holding a tablet, bright modern apartment living room in background", 404),
 "duena-inmobiliaria": ("professional mexican female owner of a real estate agency, 50 years old, short grey hair, cream suit, modern glass office at dusk in background", 505),
 "inversionista": ("mexican male real estate investor and developer, 55 years old, beard, open collar white shirt and dark blazer, rooftop terrace of a new luxury tower at sunset, ocean in background", 606),
}
for k, (d, seed) in DOCS.items():
    if only and k not in only: continue
    for v in range(2):
        t = time.time()
        g = torch.Generator().manual_seed(seed + v * 100)
        img = pipe(BASE.format(d=d), negative_prompt=NEG, num_inference_steps=6, guidance_scale=1.5, width=512, height=768, generator=g).images[0]
        img.save(os.path.join(OUT, f"{k}_v{v}.png")); print(k, v, round(time.time() - t, 1), "s", flush=True)
