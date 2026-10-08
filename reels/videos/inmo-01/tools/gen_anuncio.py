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
BASE = "RAW photo, architectural photography, {d}, ultra detailed, sharp, dslr, professional real estate marketing photo"
NEG = "text, letters, words, logo, sign, signage, watermark, signature, brand, writing, people, cartoon, anime, 3d render low quality, painting, deformed, blurry, lowres"
DOCS = {
 "torre": ("modern luxury residential condo tower with glass balconies, 20 floors, golden hour sunset, ocean in background, palm trees, Baja California coast, vertical composition", 707),
 "torre-amenidad": ("rooftop infinity pool of a luxury condo tower at sunset overlooking the ocean and city skyline, lounge chairs, vertical composition", 808),
}
for k, (d, seed) in DOCS.items():
    if only and k not in only: continue
    for v in range(2):
        t = time.time()
        g = torch.Generator().manual_seed(seed + v * 100)
        img = pipe(BASE.format(d=d), negative_prompt=NEG, num_inference_steps=6, guidance_scale=1.5, width=512, height=768, generator=g).images[0]
        img.save(os.path.join(OUT, f"{k}_v{v}.png")); print(k, v, round(time.time() - t, 1), "s", flush=True)
