import Head from 'next/head'
import axios from "axios";
import styles from '../styles/Home.module.css'

export default function Home({ phrases }) {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    const randonPhrase = randomInt(0, 10);
    return (
        <div className={styles.container}>
            <Head>
                <title>Pensador API</title>
                <meta name="description" content="Frases vindas do Pensador" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Pensador API
                </h1>
                {phrases?.length !== 0 && (<p className={styles.description}>
                    Como disse {phrases.frases[randonPhrase]?.autor}{' '}
                    <code className={styles.code}>{JSON.stringify(phrases?.frases[randonPhrase]?.texto)}</code>
                </p>)}

                <div className={styles.grid}>
                    <a href="https://github.com/hebertcisco/pensador-api#readme" className={styles.card}>
                        <h2>Documentação &rarr;</h2>
                        <p>Aprenda como integrar a API em seu projeto</p>
                    </a>

                    <a href="https://www.npmjs.com/package/pensador-promise" className={styles.card}>
                        <h2>Pacote NPM &rarr;</h2>
                        <p>Instale o Pacote NPM em seu projeto</p>
                    </a>

                    <a
                        href="https://github.com/hebertcisco/pensador-promise"
                        className={styles.card}
                    >
                        <h2>Código Fonte &rarr;</h2>
                        <p>Veja como funciona e contribuia com o projeto</p>
                    </a>

                    <a
                        href="https://pensador-api.vercel.app/?term=Jesus+Cristo&max=7"
                        className={styles.card}
                    >
                        <h2>Endpoint &rarr;</h2>
                        <p>
                            Teste o Endpoint da API que retorna um JSON de frases
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://hebertbarros.me?utm_source=pensador-promise&utm_campaign=pensador-api"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        HB.me
                    </span>
                </a>
            </footer>
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    void params;
    const revalidate = 60 * 60 * 24 * 7;
    try {
        const result = await axios({
            method: "get",
            url: `https://pensador-api.vercel.app`
        });
        const data = result.data;

        return {
            props: { phrases: data },
            revalidate: revalidate
        };
    } catch (err) {
        return {
            props: { phrases: { error: err?.message } },
            revalidate: revalidate
        };
    }
};