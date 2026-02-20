-- Seed data: Sample REBT content for the learning platform
-- Based on RD 842/2002 structure

-- Main regulation sections
INSERT INTO rebt_sections (code, title, content, "order", section_type) VALUES
  ('art-1', 'Artículo 1. Objeto', 'Este Reglamento tiene por objeto establecer las condiciones técnicas y garantías que deben cumplir las instalaciones eléctricas de baja tensión para preservar la seguridad de las personas y bienes, la regularidad del suministro y la conexión a las redes de las instalaciones de los usuarios.', 1, 'articulo'),
  ('art-2', 'Artículo 2. Ámbito de aplicación', 'Se aplicará a las instalaciones eléctricas de baja tensión, entendiendo por tales las que trabajan a tensiones nominales iguales o inferiores a 1.000 voltios en corriente alterna y 1.500 voltios en corriente continua.', 2, 'articulo'),
  ('art-3', 'Artículo 3. Definiciones', 'A efectos del presente Reglamento, se entenderá por instalación eléctrica el conjunto de aparatos y circuitos asociados, en previsión de un fin particular: producción, conversión, transformación, distribución o utilización de la energía eléctrica.', 3, 'articulo'),
  ('art-4', 'Artículo 4. Clasificación de las tensiones', 'Se consideran tensiones nominales normalizadas en baja tensión: Corriente alterna: 230 V entre fases y neutro, 400 V entre fases. Corriente continua: 24 V, 48 V, 60 V, 110 V, 125 V, 220 V, 400 V, 600 V, 750 V.', 4, 'articulo');

-- ITC-BT instructions
INSERT INTO rebt_itc (code, title, summary, content, "order") VALUES
  ('ITC-BT-01', 'ITC-BT 01: Designación de los conductores', 'Identificación y designación de conductores por colores y marcas.', 'Los conductores activos se designan por colores: Fase: Negro, Marrón o Gris. Neutro: Azul claro. Tierra: Verde-amarillo. Los conductores se identifican por marcas en los bornes.', 1),
  ('ITC-BT-02', 'ITC-BT 02: Prescripciones generales de las instalaciones', 'Requisitos generales de las instalaciones eléctricas.', 'Las instalaciones deben proyectarse de forma que garanticen la protección contra contactos directos e indirectos, sobreintensidades y sobretensiones.', 2),
  ('ITC-BT-10', 'ITC-BT 10: Puesta a tierra', 'Sistema de puesta a tierra y protección.', 'Se establecerá una puesta a tierra de servicio y una puesta a tierra de protección. Las masas deben conectarse al conductor de protección.', 10),
  ('ITC-BT-12', 'ITC-BT 12: Instalaciones comunes en edificios de viviendas', 'Instalaciones en zonas comunes de edificios.', 'Aplica a escaleras, garajes, trasteros y zonas comunes. Debe existir al menos un punto de luz en cada recinto.', 12),
  ('ITC-BT-25', 'ITC-BT 25: Prescripciones particulares para las viviendas', 'Requisitos específicos para instalaciones en viviendas.', 'Cada vivienda dispondrá de un cuadro de mando y protección con interruptor general, diferencial e interruptores automáticos.', 25),
  ('ITC-BT-27', 'ITC-BT 27: Locales con bañera o ducha', 'Instalaciones en cuartos de baño.', 'Zonas 0, 1, 2 y 3. En zona 0: tensión de seguridad ≤12 V. Materiales IPX7. Distancias mínimas a la bañera.', 27),
  ('ITC-BT-28', 'ITC-BT 28: Locales de concurrencia pública', 'Instalaciones en lugares con público.', 'Aplica a cines, teatros, restaurantes, etc. Mayor exigencia en evacuación y emergencia. Señalización obligatoria.', 28),
  ('ITC-BT-40', 'ITC-BT 40: Instalaciones generadoras de baja tensión', 'Instalaciones de generación eléctrica.', 'Células fotovoltaicas, aerogeneradores, etc. Esquema de conexión. Protecciones. Vertido a red o autoconsumo.', 40);

-- Quiz questions
INSERT INTO quiz_questions (section_id, question, options, correct_index, explanation, difficulty)
SELECT id, '¿Hasta qué tensión en alterna se considera baja tensión según el REBT?', 
  '["500 V", "1.000 V", "1.500 V", "2.000 V"]'::jsonb, 1,
  'El Art. 2 establece 1.000 V en corriente alterna y 1.500 V en corriente continua.', 'facil'
FROM rebt_sections WHERE code = 'art-2';

INSERT INTO quiz_questions (section_id, question, options, correct_index, explanation, difficulty)
SELECT id, '¿Cuál es la tensión nominal entre fases en España?',
  '["230 V", "400 V", "220 V", "380 V"]'::jsonb, 1,
  'Art. 4: 400 V entre fases, 230 V entre fase y neutro.', 'facil'
FROM rebt_sections WHERE code = 'art-4';

INSERT INTO quiz_questions (itc_id, question, options, correct_index, explanation, difficulty)
SELECT id, '¿Qué color identifica el conductor neutro?',
  '["Negro", "Azul claro", "Verde-amarillo", "Marrón"]'::jsonb, 1,
  'ITC-BT 01: Neutro = Azul claro. Fase = Negro/Marrón/Gris. Tierra = Verde-amarillo.', 'facil'
FROM rebt_itc WHERE code = 'ITC-BT-01';

INSERT INTO quiz_questions (itc_id, question, options, correct_index, explanation, difficulty)
SELECT id, '¿Qué tensión máxima se permite en zona 0 del baño?',
  '["24 V", "12 V", "50 V", "230 V"]'::jsonb, 1,
  'ITC-BT 27: En zona 0 (interior de bañera) solo tensión de seguridad ≤12 V.', 'medio'
FROM rebt_itc WHERE code = 'ITC-BT-27';
