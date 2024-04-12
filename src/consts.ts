// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'YourGrandpa';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const navlink = [
    {
        text: "Home",
        url: "/"
    },
    {
        text: "Blog",
        url: "/blog"
    },
    {
        text: "Resource",
        children: [
			{ text: "Scripts", url: "/" },
			{ text: "Tool's", url: "/" },
		], 
    },
]

export const sociallink = [
    {href: "/", text: "twitter icon", icon: "twitter"},
    {href: "/", text: "github icon", icon: "github"}
]

export const topic = [
    {text: "Google Ads", style: "bg-green-500/10 text-green-400 border-green-500/20"},
    {text: "Google Analytics", style: "bg-sky-500/10 text-sky-400 border-sky-500/20"},
    {text: "Tag Manager", style: "bg-blue-500/10 text-blue-400 border-blue-500/20"},
    {text: "Google AI", style: "bg-teal-500/10 text-teal-400 border-teal-500/20"},
    {text: "Youtube Ads", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"},
    {text: "Bidding Stategy", style: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20"},
    {text: "Technical SEO", style: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"},
    {text: "On-Page SEO", style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"},
    {text: "Off-Page SEO", style: "bg-purple-500/10 text-purple-400 border-purple-500/20"},
    {text: "Social Media", style: "bg-red-500/10 text-red-400 border-red-500/20"},
]