import type { Metadata } from 'next';
import servicios from '@/content/locales/es/servicios.json';
import { buildPageMetadata, serializeJsonLd } from '@/lib/metadata';
import { site } from '@/config/site';
import { ServiciosFinalCta, ServiciosHero, ServiciosList } from '@/components/servicios';

export const metadata: Metadata = buildPageMetadata({
  title: servicios.metadata.title,
  description: servicios.metadata.description,
  path: site.routes.servicios,
  absoluteTitle: true,
});

const ORGANIZATION_ID = `${site.siteUrl.replace(/\/+$/, '')}/#organization`;

function plainText(value: string): string {
  return value
    .replace(/\*\*\*/g, '')
    .replace(/\*\*/g, '')
    .replace(/___/g, '')
    .replace(/__/g, '');
}

/**
 * One `Service` entry per visible service section. Names mirror the
 * section eyebrows; descriptions reuse the approved section copy so no
 * new displayable text is invented.
 */
const serviceSchema = [
  {
    '@type': 'Service',
    name: 'Branding e Identidad Visual',
    description: plainText(servicios.services.branding.paragraphs[0]),
    provider: { '@id': ORGANIZATION_ID },
  },
  {
    '@type': 'Service',
    name: 'Diseño Gráfico',
    description: plainText(servicios.services.graphicDesign.paragraphs[0]),
    provider: { '@id': ORGANIZATION_ID },
  },
  {
    '@type': 'Service',
    name: 'Diseño Web',
    description: plainText(servicios.services.webDesign.paragraphs[0]),
    provider: { '@id': ORGANIZATION_ID },
  },
  {
    '@type': 'Service',
    name: 'E-Commerce',
    description: plainText(servicios.services.ecommerce.paragraphs[0]),
    provider: { '@id': ORGANIZATION_ID },
  },
  {
    '@type': 'Service',
    name: 'Estrategia de Contenido y Manejo de Redes',
    description: plainText(servicios.services.contentStrategy.lede),
    provider: { '@id': ORGANIZATION_ID },
  },
  {
    '@type': 'Service',
    name: 'Naming Estratégico',
    description: plainText(servicios.services.naming.paragraphs[0]),
    provider: { '@id': ORGANIZATION_ID },
  },
];

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <ServiciosHero />
      <ServiciosList />
      <ServiciosFinalCta />
    </>
  );
}
