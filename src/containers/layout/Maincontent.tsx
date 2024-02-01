"use client"

import styles from "@/styles/layout/_maincontent.module.scss"
import Overlay from "../overlay/Overlay";
import { useState } from "react";

export default function Sidebar({
	children,
  }: {
	children: React.ReactNode
  }) {

	const [FlexbarWidth, setFlexBarWidth] = useState("500px");

	const toggleFlexBarWidth = () => {
	  setFlexBarWidth((prevWidth) => {
		if (prevWidth === "0px") return "500px";
		if (prevWidth === "500px") return "95%";
		return "0px"; // 나머지 경우에는 0으로 변경
	  });
	};

	function ButtonImg(){
		if(FlexbarWidth == "95%")
		{
			return (<img src="/icon/expand_left.svg" alt="expand left" className={styles.icon} />);
		}
		else
			return(<img src="/icon/expand_right.svg" alt="expand right" className={styles.icon} />);
	}

	return(
		<section className={styles.container}>
			<div className={`${styles.maincontent} ${FlexbarWidth != "0px" ? styles.visible : ''}`} style={{width:FlexbarWidth}}>
				<main>
					{children}
				</main>
			</div>
			<div>
				<button onClick={toggleFlexBarWidth} className={styles.mainButton}>
					{ButtonImg()}
				</button>
			</div>
			<div className={styles.overlay}>
				<Overlay />
			</div>
		</section>
	);
}
