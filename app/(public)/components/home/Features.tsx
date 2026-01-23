'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import {
	TwitterLogoIcon,
	InstagramLogoIcon,
	LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import {
	FadeIn,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations/animations';

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

// Sample chart data
const chartData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	datasets: [
		{
			label: 'Followers',
			data: [1200, 1900, 3000, 5000, 7200, 9800],
			borderColor: 'rgb(254, 44, 85)',
			backgroundColor: 'rgba(254, 44, 85, 0.1)',
			fill: true,
			tension: 0.4,
		},
	],
};

const getChartOptions = () => {
	const isDark =
		typeof window !== 'undefined' &&
		document.documentElement.classList.contains('dark');
	const textColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)';
	const gridColor = isDark
		? 'rgba(255, 255, 255, 0.1)'
		: 'rgba(0, 0, 0, 0.1)';

	return {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'hsl(var(--popover))',
				titleColor: 'hsl(var(--popover-foreground))',
				bodyColor: 'hsl(var(--popover-foreground))',
				borderColor: 'hsl(var(--border))',
				borderWidth: 1,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: gridColor,
				},
				ticks: {
					color: textColor,
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: textColor,
				},
			},
		},
	};
};

export function Features() {
	const [themeKey, setThemeKey] = useState(0);

	useEffect(() => {
		// Listen for theme changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'class') {
					setThemeKey((prev) => prev + 1);
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section id="features" className="py-16 md:py-32 dark:bg-transparent">
			<div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
				<FadeIn direction="up" className="mb-12 text-center">
					<h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
						Everything you need in one platform
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Powerful features to manage, analyze, and grow your social media
						presence
					</p>
				</FadeIn>
				<div className="relative">
					<StaggerContainer className="relative  z-10 grid grid-cols-6 gap-4" staggerDelay={0.1}>
					{/* Card 1 - Multi-Platform Connections */}
					<StaggerItem index={0} className="col-span-full lg:col-span-2">
					<Card className="relative flex overflow-hidden h-full">
						<CardContent className="relative p-6 flex flex-col justify-between w-full">
							<div>
								<h3 className="text-xl font-semibold mb-2">
									Connect All Your Accounts
								</h3>
								<p className="text-sm text-muted-foreground">
									Link multiple social media accounts from Instagram, TikTok,
									YouTube, X, LinkedIn, and more—all in one place.
								</p>
							</div>
							<div className="grid grid-cols-4 gap-3 mt-6">
								{/* Instagram */}
								<div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
									<InstagramLogoIcon className="h-5 w-5 text-white" />
								</div>
								
								{/* X (Twitter) */}
								<div className="h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                                <svg className="h-5 w-5 text-white" viewBox="0 0 32 32" fill="currentColor">
			                            <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
		                            </svg>								
                                </div>
								
								{/* LinkedIn */}
								<div className="h-10 w-10 rounded-full bg-[#0077B5] flex items-center justify-center">
									<LinkedInLogoIcon className="h-5 w-5 text-white" />
								</div>
								
								{/* YouTube */}
								<div className="h-10 w-10 rounded-full bg-[#FF0000] flex items-center justify-center">
									<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
										<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
									</svg>
								</div>
								
								{/* TikTok */}
								<div className="h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
									<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
										<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#EE1D52"/>
										<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#69C9D0"/>
									</svg>
								</div>
								
								{/* Facebook */}
								<div className="h-10 w-10 rounded-full bg-[#1877F2] flex items-center justify-center">
									<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
									</svg>
								</div>
								
							{/* Threads */}
							<div className="h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
								<svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
									<path className="dark:fill-black fill-white" d="M22.7,14.977c-.121-.058-.243-.113-.367-.167-.216-3.982-2.392-6.262-6.046-6.285-.017,0-.033,0-.05,0-2.185,0-4.003,.933-5.122,2.63l2.009,1.378c.836-1.268,2.147-1.538,3.113-1.538,.011,0,.022,0,.033,0,1.203,.008,2.111,.357,2.698,1.04,.428,.497,.714,1.183,.855,2.049-1.067-.181-2.22-.237-3.453-.166-3.474,.2-5.707,2.226-5.557,5.041,.076,1.428,.788,2.656,2.003,3.459,1.028,.678,2.351,1.01,3.727,.935,1.817-.1,3.242-.793,4.236-2.06,.755-.963,1.233-2.21,1.444-3.781,.866,.523,1.507,1.21,1.862,2.037,.603,1.405,.638,3.714-1.246,5.596-1.651,1.649-3.635,2.363-6.634,2.385-3.326-.025-5.842-1.091-7.478-3.171-1.532-1.947-2.323-4.759-2.353-8.359,.03-3.599,.821-6.412,2.353-8.359,1.636-2.079,4.151-3.146,7.478-3.171,3.35,.025,5.91,1.097,7.608,3.186,.833,1.025,1.461,2.313,1.874,3.815l2.355-.628c-.502-1.849-1.291-3.443-2.365-4.764-2.177-2.679-5.361-4.051-9.464-4.08h-.016c-4.094,.028-7.243,1.406-9.358,4.095-1.882,2.393-2.853,5.722-2.886,9.895v.01s0,.01,0,.01c.033,4.173,1.004,7.503,2.886,9.895,2.115,2.689,5.264,4.067,9.358,4.095h.016c3.64-.025,6.206-.978,8.32-3.09,2.765-2.763,2.682-6.226,1.771-8.352-.654-1.525-1.901-2.763-3.605-3.581Zm-6.285,5.909c-1.522,.086-3.104-.598-3.182-2.061-.058-1.085,.772-2.296,3.276-2.441,.287-.017,.568-.025,.844-.025,.909,0,1.76,.088,2.533,.257-.288,3.602-1.98,4.187-3.471,4.269Z"></path>
								</svg>
							</div>
								
								{/* Twitch */}
								<div className="h-10 w-10 rounded-full bg-[#9146FF] flex items-center justify-center">
									<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
										<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
									</svg>
								</div>
								
							{/* Snapchat */}
							<div className="h-10 w-10 rounded-full bg-[#FFFC00] flex items-center justify-center">
								<svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
									<path fill="#000000" d="M30.893,22.837c-.208-.567-.606-.871-1.058-1.122-.085-.05-.163-.09-.23-.12-.135-.07-.273-.137-.41-.208-1.41-.747-2.51-1.69-3.274-2.808-.217-.315-.405-.648-.562-.996-.065-.186-.062-.292-.015-.389,.046-.074,.108-.138,.18-.188,.242-.16,.492-.323,.661-.432,.302-.195,.541-.35,.695-.46,.579-.405,.983-.835,1.236-1.315,.357-.672,.404-1.466,.13-2.175-.383-1.009-1.336-1.635-2.49-1.635-.243,0-.486,.025-.724,.077-.064,.014-.127,.028-.189,.044,.011-.69-.005-1.418-.066-2.135-.218-2.519-1.1-3.84-2.02-4.893-.589-.66-1.283-1.218-2.053-1.653-1.396-.797-2.979-1.202-4.704-1.202s-3.301,.405-4.698,1.202c-.773,.434-1.468,.994-2.057,1.656-.92,1.053-1.802,2.376-2.02,4.893-.061,.717-.077,1.449-.067,2.135-.062-.016-.125-.031-.189-.044-.238-.051-.481-.077-.724-.077-1.155,0-2.109,.626-2.491,1.635-.276,.71-.23,1.505,.126,2.178,.254,.481,.658,.911,1.237,1.315,.153,.107,.393,.262,.695,.46,.163,.106,.402,.261,.635,.415,.082,.053,.151,.123,.204,.205,.049,.1,.051,.208-.022,.408-.155,.341-.34,.668-.553,.976-.747,1.092-1.815,2.018-3.179,2.759-.723,.383-1.474,.639-1.791,1.502-.239,.651-.083,1.391,.525,2.015h0c.223,.233,.482,.429,.766,.58,.592,.326,1.222,.578,1.876,.75,.135,.035,.263,.092,.379,.169,.222,.194,.19,.486,.485,.914,.148,.221,.336,.412,.555,.564,.619,.428,1.315,.455,2.053,.483,.666,.025,1.421,.054,2.283,.339,.357,.118,.728,.346,1.158,.613,1.032,.635,2.446,1.503,4.811,1.503s3.789-.873,4.829-1.51c.427-.262,.796-.488,1.143-.603,.862-.285,1.617-.313,2.283-.339,.737-.028,1.433-.055,2.053-.483,.259-.181,.475-.416,.632-.69,.212-.361,.207-.613,.406-.789,.109-.074,.229-.129,.356-.162,.662-.173,1.301-.428,1.901-.757,.302-.162,.575-.375,.805-.63l.008-.009c.57-.61,.714-1.329,.48-1.964Zm-2.102,1.13c-1.282,.708-2.135,.632-2.798,1.059-.563,.363-.23,1.144-.639,1.426-.503,.347-1.989-.025-3.909,.609-1.584,.524-2.594,2.029-5.442,2.029s-3.835-1.502-5.444-2.033c-1.916-.634-3.406-.262-3.909-.609-.409-.282-.077-1.064-.639-1.426-.664-.427-1.516-.351-2.798-1.055-.816-.451-.353-.73-.081-.862,4.645-2.249,5.386-5.721,5.419-5.979,.04-.312,.084-.557-.259-.875-.332-.307-1.804-1.218-2.213-1.503-.676-.472-.973-.944-.754-1.523,.153-.401,.527-.552,.92-.552,.124,0,.248,.014,.369,.041,.742,.161,1.462,.533,1.879,.633,.05,.013,.102,.02,.153,.021,.222,0,.3-.112,.285-.366-.048-.812-.162-2.394-.034-3.872,.176-2.034,.831-3.042,1.61-3.934,.374-.428,2.132-2.286,5.493-2.286s5.123,1.85,5.497,2.276c.78,.891,1.436,1.899,1.61,3.934,.128,1.479,.018,3.061-.034,3.872-.018,.268,.063,.366,.285,.366,.052,0,.103-.008,.153-.021,.417-.1,1.137-.472,1.879-.633,.121-.027,.245-.041,.369-.041,.395,0,.766,.153,.92,.552,.219,.579-.077,1.051-.753,1.523-.409,.285-1.881,1.196-2.213,1.503-.344,.317-.299,.563-.259,.875,.033,.261,.773,3.734,5.419,5.979,.274,.137,.737,.416-.079,.871Z"></path>
								</svg>
							</div>
								
								{/* Tumblr */}
								<div className="h-10 w-10 rounded-full bg-[#35465C] flex items-center justify-center">
									<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
										<path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"/>
									</svg>
								</div>
								
							{/* Kick */}
							<div className="h-10 w-10 rounded-full bg-[#53FC18] flex items-center justify-center">
								<svg className='h-5 w-5' viewBox="0 0 32 32" fill="currentColor">
									<path fill="currentColor" fillRule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5v14c0 2.2091 1.79086 4 4 4h14c2.2091 0 4 -1.7909 4 -4V5c0 -2.20914 -1.7909 -4 -4 -4H5Zm5.3696 3.5H5.47827v15h4.89133v-3.2609H12v1.6305h1.6304V19.5h4.8913v-4.8913h-1.6304v-1.6304h-1.6304v-1.9566h1.6304V9.3913h1.6304V4.5h-4.8913v1.63043H12v1.63044h-1.6304V4.5Z" strokeWidth="1"></path>
								</svg>
							</div>
								
							{/* OnlyFans */}
							<div className="h-10 w-10 rounded-full bg-[#00AFF0] flex items-center justify-center">
								<svg className="h-5 w-5 text-white" viewBox="0 0 32 32" fill="currentColor">
									<path d="M10.667,5.333C4.776,5.333,0,10.109,0,16s4.776,10.667,10.667,10.667,10.667-4.776,10.667-10.667S16.558,5.333,10.667,5.333Zm0,13.867c-1.767,0-3.2-1.433-3.2-3.2s1.433-3.2,3.2-3.2,3.2,1.433,3.2,3.2c.002,1.765-1.427,3.198-3.191,3.2-.003,0-.006,0-.009,0Z" opacity=".8"></path>
									<path d="M22.656,13.333c2.71,.78,5.909,0,5.909,0-.928,4.053-3.872,6.592-8.118,6.901-1.683,3.906-5.528,6.435-9.781,6.432l3.2-10.171c3.29-10.454,4.976-11.162,12.777-11.162h5.356c-.896,3.947-3.984,6.961-9.344,8Z"></path>
								</svg>
							</div>
							</div>
						</CardContent>
					</Card>
					</StaggerItem>

						{/* Card 2 - Metrics & Charts */}
						<StaggerItem index={1} className="col-span-full lg:col-span-4">
						<Card className="relative overflow-hidden h-full">
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">
									Metrics & Analytics
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									Track your growth with beautiful charts and detailed metrics
									across all platforms.
								</p>
								<div className="h-48 mt-4">
									<Line
										key={themeKey}
										data={chartData}
										options={getChartOptions()}
									/>
								</div>
							</CardContent>
						</Card>
						</StaggerItem>

						{/* Card 3 - AI Insights */}
						<StaggerItem index={2} className="col-span-full sm:col-span-3 lg:col-span-2">
						<Card className="relative overflow-hidden h-full">
							<CardContent className="p-6">
								<div className="mb-4">
									<div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="h-6 w-6 text-primary-foreground"
										>
											<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
										</svg>
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-2">AI Insights</h3>
								<p className="text-sm text-muted-foreground">
									Get intelligent recommendations on what to post, when to post,
									and how to improve engagement based on your data.
								</p>
							</CardContent>
						</Card>
						</StaggerItem>

						{/* Card 4 - Content Management */}
						<StaggerItem index={3} className="col-span-full sm:col-span-3 lg:col-span-2">
						<Card className="relative overflow-hidden h-full">
							<CardContent className="p-6">
								<div className="mb-4">
									<div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="h-6 w-6"
										>
											<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
											<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
										</svg>
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Content Management
								</h3>
								<p className="text-sm text-muted-foreground">
									Schedule posts, track performance, and manage your content
									calendar across all platforms from one dashboard.
								</p>
							</CardContent>
						</Card>
						</StaggerItem>

						{/* Card 5 - Ads & Monetization */}
						<StaggerItem index={4} className="col-span-full sm:col-span-3 lg:col-span-2">
						<Card className="relative overflow-hidden h-full">
							<CardContent className="p-6">
								<div className="mb-4">
									<div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="h-6 w-6 text-green-600 dark:text-green-400"
										>
											<path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
											<path
												fillRule="evenodd"
												d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Ads & Monetization
								</h3>
								<p className="text-sm text-muted-foreground">
									Track ad performance, monitor revenue streams, and optimize
									your monetization strategy across platforms.
								</p>
							</CardContent>
						</Card>
						</StaggerItem>

						{/* Card 6 - Community Management */}
						<StaggerItem index={5} className="col-span-full sm:col-span-3 lg:col-span-3">
						<Card className="relative overflow-hidden h-full">
							<CardContent className="p-6">
								<div className="mb-4">
									<div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="h-6 w-6 text-blue-600 dark:text-blue-400"
										>
											<path
												fillRule="evenodd"
												d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
												clipRule="evenodd"
											/>
											<path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
										</svg>
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Community Management
								</h3>
								<p className="text-sm text-muted-foreground">
									View and respond to comments, engage with your audience, and
									get demographic insights—all from your unified dashboard.
								</p>
							</CardContent>
						</Card>
						</StaggerItem>

						{/* Card 7 - Team Collaboration & Reports */}
						<StaggerItem index={6} className="col-span-full sm:col-span-3 lg:col-span-3">
						<Card className="relative overflow-hidden h-full">
							<CardContent className="p-6">
								<div className="mb-4">
									<div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="h-6 w-6 text-purple-600 dark:text-purple-400"
										>
											<path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
											<path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
										</svg>
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Reports & Team Collaboration
								</h3>
								<p className="text-sm text-muted-foreground">
									Generate detailed reports for any date range, share insights
									with your team, and collaborate on social strategy.
								</p>
							</CardContent>
						</Card>
						</StaggerItem>
					</StaggerContainer>
				</div>
			</div>
		</section>
	);
}
