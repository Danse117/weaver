import { AnimatedBackground } from "../components/home/AnimatedBackground";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
	return (
		<>
			<AnimatedBackground />
			<div className="flex min-h-[calc(100vh-14rem)] items-center justify-center px-4 py-12">
				<LoginForm />
			</div>
		</>
	);
}
