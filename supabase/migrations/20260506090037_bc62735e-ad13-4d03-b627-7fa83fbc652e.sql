
UPDATE blog_posts SET image_url = 'https://wyxsfjvoqxldsxvepnyu.supabase.co/storage/v1/object/public/blog-images/' || slug || '-v2.png'
WHERE slug IN (
  'hy-calamine-comparativa-maquinas-descarbonizadoras',
  'rentabilidad-servicio-descarbonizacion-taller',
  'eurocat-6d-motor-diesel-descarbonizacion',
  'mantenimiento-preventivo-flotas-diesel',
  'valvula-egr-que-es-como-limpiar',
  'normativa-itv-emisiones-2024-espana',
  'descarbonizacion-hidrogeno-como-funciona',
  'descarbonizacion-antes-itv-funciona',
  'carbon-fap-aditivo-dpf-review',
  'que-es-descarbonizacion-motor',
  'cuando-hacer-descarbonizacion-motor-diesel',
  'sintomas-filtro-particulas-obstruido'
);
