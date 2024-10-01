// import Image from "next/image";
import styles from "./page.module.css";
import Filters from "@/app/filters";

export default function Home() {
    return (
        <div className={styles.page}>
            <Filters/>
            .. list ..
        </div>
    );
}
