"use client"
import { signIn } from "next-auth/react"
import React from "react";
const Login = () => {
    return (
        <div>
            <h1 className="font-bold text-3xl py-14 container mx-auto text-center text-white">
                Login/Signup To Get Your Fans To Support You
            </h1>

            <div className="flex flex-col items-center gap-3">

                {/* Google */}
                <button
                    type="button"
                    className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z"
                        />
                        <path
                            fill="#FF3D00"
                            d="M6.3 14.7l6.6 4.8C14.7 16 18.9 12 24 12c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7Z"
                        />
                        <path
                            fill="#4CAF50"
                            d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.4 39.6 16.1 44 24 44Z"
                        />
                        <path
                            fill="#1976D2"
                            d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.7-6.6 7.2l6.3 5.2C34.6 39.9 44 34 44 24c0-1.2-.1-2.4-.4-3.5Z"
                        />
                    </svg>

                    <span>Continue with Google</span>
                </button>

                {/* LinkedIn */}
                <button
                    type="button"
                    className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#0077B5"
                            d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V8.99H3.56v11.46Z"
                        />
                    </svg>

                    <span>Continue with LinkedIn</span>
                </button>

                {/* Twitter */}
                <button
                    type="button"
                    className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000000"
                            d="M18.9 2H22l-6.77 7.74L23.2 22h-6.25l-4.9-6.4L6.45 22H3.3l7.24-8.28L2.8 2h6.4l4.43 5.86L18.9 2Zm-1.1 17.9h1.73L8.35 4.02H6.49L17.8 19.9Z"
                        />
                    </svg>

                    <span>Continue with Twitter</span>
                </button>

                {/* Facebook */}
                <button
                    type="button"
                    className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#1877F2"
                            d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07Z"
                        />
                    </svg>

                    <span>Continue with Facebook</span>
                </button>

                {/* GitHub */}
                <button
                    type="button"
                    onClick={() => signIn("github")}
                    className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#181717"
                            d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.3 9.41 7.87 10.94.58.1.79-.25.79-.56v-2.18c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.83 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.77.11 3.06.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                        />
                    </svg>

                    <span>Continue with Github</span>
                </button>

                {/* Apple */}
                <button
                    type="button"
                    className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000000"
                            d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.38 1.8-3.12 1.87-2.38 5.97.48 7.12-.57 1.5-1.31 2.99-2.51 4.1ZM12.03 7.25C11.88 5.02 13.69 3.18 15.74 3c.29 2.58-2.34 4.5-3.71 4.25Z"
                        />
                    </svg>

                    <span>Continue with Apple</span>
                </button>

            </div>
        </div>
    );
};

export default Login;
