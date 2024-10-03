import styles from "./page.module.css";
import ListComponent from "@/app/list";

export default async function Home() {

    return (
        <div className={styles.page}>
            <ListComponent />
        </div>
    );
}
