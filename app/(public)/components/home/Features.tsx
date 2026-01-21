import { Card, CardContent } from '@/components/ui/card'

export function Features() {
    return (
        <section className=" py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-3">
                        {/* Card 1 */}
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                            <CardContent className="relative m-auto size-fit pt-6">
                                <div className="relative flex h-24 w-56 items-center">
                                        
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 2 */}
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                            <CardContent className="relative m-auto size-fit pt-6">
                                <div className="relative flex h-24 w-56 items-center">
                                        
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 3 */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                            <CardContent className="pt-6">
                                <div className="pt-6 lg:px-6">
   
                                </div>
                                <div className="relative z-10 mt-14 space-y-2 text-center">
      
                                </div>
                            </CardContent>
                        </Card>
                        {/* Card 4 */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3">
                            <CardContent className="grid pt-6 sm:grid-cols-2">

                            </CardContent>
                        </Card>
                        {/* Card 5 */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
