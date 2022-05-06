import styles from "../styles/cook_groups_home.module.css";
import Link from "next/link";
import Image from "next/image";

const Cook_groups = (props) => {

//https://www.npmjs.com/package/react-qr-reader
  return (
    
    <main className={styles.main}>
    <div className={styles.topbar}>
      

        <h1 className={styles.maintitle}>Cook Groups</h1>
      
      <div className={styles.actionItems}>

{/*           <Link href={`/QRScan`} className={styles.navButtonQR}>
            <Image
              width={32}
              height={32}
              src={navButtonQR}
              className={styles.navButtonQR}
            />
          </Link> */}


      </div>
      </div>
      </main>
  );
};

export default Cook_groups;
