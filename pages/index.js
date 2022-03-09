import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Question generation</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to{" "}
					<Link href={"/generate"}>
						<a>Question Generation</a>
					</Link>
				</h1>
			</main>
		</div>
	)
}
