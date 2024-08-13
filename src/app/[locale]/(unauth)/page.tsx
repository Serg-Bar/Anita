import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <p>
      Anita{' '}
      <a
        className="text-blue-700 hover:border-b-2 hover:border-blue-700"
        href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
      >
        Next.js Boilerplate SaaS
      </a>{' '}
      can help you build one.
    </p>
  );
}
