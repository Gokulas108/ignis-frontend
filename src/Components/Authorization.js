import Layout from "./Layout";
export default function Authorization() {
	return (
		<div
			style={{
				backgroundColor: "#F7F6F6",
				display: "flex",
				justifyContent: "center",
				height: "500px",
				alignItems: "center",
			}}
		>
			<h2>You are not authorized to view this page. Access denied</h2>
		</div>
	);
}
