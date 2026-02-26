import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';
import { userService } from "../../services/apiService";
import { motion, useMotionValue, useSpring } from "framer-motion";

import "./Login.css";

const LoginPage = () => {
  	const [email, setUsername] 	= useState("admin");
  	const [password, setPassword] = useState("admin@123#");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { theme } = useTheme();
	const formRef = useRef(null);

	// Motion values for 3D rotation
	const rotateX = useMotionValue(0);
	const rotateY = useMotionValue(0);

	// Spring animations for smooth, subtle movement
	const springConfig = { damping: 30, stiffness: 300 };
	const rotateXSpring = useSpring(rotateX, springConfig);
	const rotateYSpring = useSpring(rotateY, springConfig);

	const handleError = async (error) => {
		if (error.response) {
			setError(error.response.data.message);
		} else if (error.request) {
			//setError('Network Error:', error.request);
		} else {
			//setError('Unknown Error:', error.message);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await userService.login({ email, password });
			if (response.data.length > 0) {
				localStorage.setItem('token', response.data[0].token);
				localStorage.setItem('topnav', 'dashboard');
				navigate('/dashboard');
			}
		} catch (error) {
			handleError(error);
		}
	};

	const checkUser = useCallback(async () => {
		try {
			const isAuthenticated = localStorage.getItem("token");
			if (isAuthenticated) {
				const response = await UserService.checkToken();
				if (response.data.length > 0) {
					navigate('/dashboard');
				}
			}

		} catch (error) {
			handleError(error);
		}

	}, []);

	useEffect(() => {
		checkUser();
	}, [checkUser]);

	// Mouse move handler for 3D effect
	const handleMouseMove = (e) => {
		if (!formRef.current) return;

		const rect = formRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const mouseX = e.clientX - centerX;
		const mouseY = e.clientY - centerY;

		// Calculate subtle rotation (max 3 degrees to prevent flipping)
		const maxRotation = 3;
		const rotateXValue = Math.max(-maxRotation, Math.min(maxRotation, (mouseY / (rect.height / 2)) * -maxRotation));
		const rotateYValue = Math.max(-maxRotation, Math.min(maxRotation, (mouseX / (rect.width / 2)) * maxRotation));

		rotateX.set(rotateXValue);
		rotateY.set(rotateYValue);
	};

	const handleMouseLeave = () => {
		rotateX.set(0);
		rotateY.set(0);
	};


	// Animation variants for the login form
	const formVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.9 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.4 }
		}
	};

	const inputVariants = {
		focus: {
			scale: 1.02,
			transition: { duration: 0.2 }
		},
		blur: {
			scale: 1,
			transition: { duration: 0.2 }
		}
	};

	const buttonVariants = {
		hover: {
			scale: 1.05,
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
			transition: { duration: 0.2 }
		},
		tap: {
			scale: 0.95
		}
	};

	const errorVariants = {
		hidden: { opacity: 0, y: -10, height: 0 },
		visible: {
			opacity: 1,
			y: 0,
			height: "auto",
			transition: { duration: 0.3 }
		}
	};

	return (
		<div
			className={`login-container bg-${theme.color}`}
			style={{ position: 'relative', overflow: 'hidden', perspective: '1000px' }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* Animated Background Elements */}
			<motion.div
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					top: 0,
					left: 0,
					zIndex: 0,
					background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #16213e 100%)',
					backgroundSize: '200% 200%',
				}}
				animate={{
					backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
				}}
				transition={{
					duration: 30,
					repeat: Infinity,
					ease: "linear"
				}}
			/>

			{/* Login Form */}
			<motion.div
				ref={formRef}
				className="login-box"
				variants={formVariants}
				initial="hidden"
				animate="visible"
				style={{
					position: 'relative',
					zIndex: 2,
					rotateX: rotateXSpring,
					rotateY: rotateYSpring,
					transformStyle: 'preserve-3d',
				}}
			>
				<motion.img
					src="logo.png"
					alt="logo"
					height="36"
					width="220"
					variants={itemVariants}
				/>

				<motion.p
					className={`txt-${theme.color}`}
					style={{ margin: '10px' }}
					variants={itemVariants}
				>
					Get you own system details !
				</motion.p>

				<motion.hr
					className="border border-muted"
					variants={itemVariants}
					initial={{ width: 0 }}
					animate={{ width: '100%' }}
					transition={{ duration: 0.5, delay: 0.3 }}
				/>

				<motion.div
					variants={errorVariants}
					initial="hidden"
					animate={error ? "visible" : "hidden"}
				>
					{error && <p className="error">{error}</p>}
				</motion.div>

				<form onSubmit={handleSubmit}>
					<motion.div
						className="input-group"
						style={{ width: '100%' }}
						variants={itemVariants}
					>
						<label
							htmlFor="email"
							style={{
								display: 'block',
								marginBottom: '6px',
								fontWeight: '500',
								color: '#555',
							}}
						>
							Username
						</label>
						<motion.input
							style={{
								width: '100%',
								padding: '5px',
								border: '1px solid #ccc',
								borderRadius: '6px',
								fontSize: '16px',
								borderTopLeftRadius: '6px',
								borderBottomLeftRadius: '6px'
							}}
							id="email"
							autoComplete="off"
							type="text"
							className="form-control"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setUsername(e.target.value)}
							required
							variants={inputVariants}
							whileFocus="focus"
							whileBlur="blur"
						/>
					</motion.div>

					<motion.div
						className="input-group"
						style={{ width: '100%' }}
						variants={itemVariants}
					>
						<label
							htmlFor="pass"
							style={{
								display: 'block',
								marginBottom: '6px',
								fontWeight: '500',
								color: '#555',
							}}
						>
							Password
						</label>
						<motion.input
							style={{
								width: '100%',
								padding: '5px',
								border: '1px solid #ccc',
								borderRadius: '6px',
								fontSize: '16px',
								borderTopLeftRadius: '6px',
								borderBottomLeftRadius: '6px'
							}}
							className="form-control"
							id="pass"
							autoComplete="off"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							variants={inputVariants}
							whileFocus="focus"
							whileBlur="blur"
						/>
					</motion.div>

					<motion.button
						type="submit"
						style={{ padding: "4px", width: "50%", marginTop: "5%" }}
						className={`btn btn-${theme.color}`}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						Login
					</motion.button>
				</form>

				<motion.p
					className={`text-muted m-0 mt-4`}
					variants={itemVariants}
				>
					Powered By
				</motion.p>
				<motion.p
					className={`text-primary m-0`}
					variants={itemVariants}
				>
					Tarun Bharti
				</motion.p>
			</motion.div>
		</div>
	);
};

export default LoginPage;