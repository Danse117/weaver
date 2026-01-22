"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
	id: string;
	title?: string;
	description?: string;
	variant?: "default" | "destructive";
	onClose: () => void;
}

export function Toast({ title, description, variant = "default", onClose }: ToastProps) {
	return (
		<div
			className={cn(
				"pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all",
				variant === "destructive"
					? "border-destructive bg-destructive text-destructive-foreground"
					: "border bg-background"
			)}
		>
			<div className="grid gap-1">
				{title && <div className="text-sm font-semibold">{title}</div>}
				{description && (
					<div className="text-sm opacity-90">{description}</div>
				)}
			</div>
			<button
				onClick={onClose}
				className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
			>
				<X className="h-4 w-4" />
			</button>
		</div>
	);
}

export interface ToasterProps {
	toasts: ToastProps[];
}

export function Toaster({ toasts }: ToasterProps) {
	return (
		<div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</div>
	);
}
