import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX, BsGithub } from "react-icons/bs";

export default function FooterCom() {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex">
                    <div className="mt-5">
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-lg font-semibold dark:text-white'
                        >
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                                Jeet&apos;s
                            </span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" target="_blank">
                                    Twitter Clone
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank">
                                    Jeet&apos;s blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        <div>
                            <Footer.Title title="Follow Us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://github.com/Jeet0105" target="_blank">
                                    Github
                                </Footer.Link>
                                <Footer.Link href="#" target="_blank">
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        <div >
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" target="_blank">
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#" target="_blank">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>

                <Footer.Divider />
                <div className=" w-full sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-start">
                        <Footer.Copyright href="#" by="Jeet's blog" year={new Date().getFullYear()} />
                    </div>
                    <div className="flex gap-5 mt-3">
                        <div>
                            <Footer.Icon href="#" icon={BsFacebook} />
                        </div>
                        <div>
                            <Footer.Icon href="https://www.instagram.com/jeet_maheshwari05/" target="_blank" icon={BsInstagram} />
                        </div>
                        <div>
                            <Footer.Icon href="https://www.linkedin.com/in/jeet-maheshwari-05b869253/" target="_blank" icon={BsLinkedin} />
                        </div>
                        <div>
                            <Footer.Icon href="https://x.com/jeet010505" target="_blank" icon={BsTwitterX} />
                        </div>
                        <div>
                            <Footer.Icon href="https://github.com/Jeet0105" target="_blank" icon={BsGithub} />
                        </div>
                    </div>
                </div>

            </div>
        </Footer>
    )
}
