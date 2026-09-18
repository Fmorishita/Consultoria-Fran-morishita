# Nota sobre la ubicación de este proyecto

Este directorio contiene un **proyecto independiente**: el rediseño de
treulegal.solutions. No comparte código, dependencias ni despliegue con el
resto del repositorio.

Está aquí sólo porque la sesión que lo generó estaba limitada a este
repositorio y no tenía permiso para crear uno nuevo en GitHub. **Debe moverse
a su propio repositorio.** Una vez creado el repositorio vacío
(por ejemplo `treu-legal-solutions`), basta con:

```bash
# Desde la raíz de este repositorio
git subtree split --prefix=treu-legal -b treu-legal-solo
git clone . /tmp/treu-legal-solutions --branch treu-legal-solo --single-branch
cd /tmp/treu-legal-solutions
git remote set-url origin git@github.com:<usuario>/treu-legal-solutions.git
git push -u origin treu-legal-solo:main
```

Después se puede borrar `treu-legal/` de este repositorio y apuntar el
proyecto de Vercel al repositorio nuevo.
