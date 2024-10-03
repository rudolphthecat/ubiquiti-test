import styles from "./page.module.css";
import ListComponent from "@/app/list";
import { Suspense } from "react";

export default async function Home() {

    return (
        <div className={styles.page}>
            <Suspense>
                <ListComponent />
            </Suspense>
        </div>
    );
}
