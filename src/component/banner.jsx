export default function Banner(){
    return(
        <div className="flex w-full max-w-6xl bg-red sm:mt-12 flex-col sm:flex-row px-16 gap-x-8 justify-center items-center shadow-lg py-6 mx-auto">
            <div className="max-w-md flex items-center">
                <img src="banner1.png" alt=""/>
            </div>
            <div className="max-w-md flex items-center">
                <img src="banner2.png" alt="" className="my-auto"/>
            </div>
        </div>
    )
}