export function Postit(){

    return(
        <>
            <div className="aspect-video rounded-xl bg-muted/50">
                <div className="max-w-2xl mx-auto p-4">
                        <div className="overflow-auto rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"> 
                            <div className="p-6 pb-2 flex flex-row items-center justify-between border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <iframe src="https://post-rgg7.vercel.app/" width="560" height="505"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}