"use client"

import styles from "@/styles/layout/_maincontent.module.scss"
import Overlay from "../overlay/Overlay";
import { useState } from "react";

export default function Sidebar({
	children,
  }: {
	children: React.ReactNode
  }) {

	const [FlexbarWidth, setFlexBarWidth] = useState("600px");

	const toggleFlexBarWidth = () => {
	  setFlexBarWidth((prevWidth) => {
		if (prevWidth === "0px") return "600px"; // 0이면 600으로 변경
		if (prevWidth === "600px") return "92vw"; // 600이면 전체 화면 너비로 변경(슬라이드 바 부분 제외)
		return "0px"; // 나머지 경우에는 0으로 변경
	  });
	};

	return(
		<section className={styles.container}>
			<div className={styles.maincontent} style={{width:FlexbarWidth}}>
				{
					FlexbarWidth != "0px" &&
					<main>
						{children}
					</main>
				}
			</div>
			<div>
				<button onClick={toggleFlexBarWidth} className={styles.mainButton}>버튼1</button>
			</div>
			<div className={styles.overlay}>
				<Overlay />
			</div>
		</section>
	);
}
