import '../../App.css';

const styles = {
    container: 'flex flex-col lg:flex-row items-center lg:items-start justify-evenly w-full shadow-lg border-[1px] border-[#e5e5e5] gap-y-6',
    firstBlock: 'p-4 rounded-xl h-fit lg:min-h-[90vh] w-[85%] lg:w-[45%] bg-white border-[1px] border-[#c5c5c5]',
    secondBlock: 'py-3 rounded-xl px-2 lg:px-4 w-[85%] lg:w-[45%] bg-[#eff1fa] border-[1px] border-[#c5c5c5]',
    closeIcon:'absolute right-11 sm:right-20 z-10 lg:right-16 h-[22px] w-[22px] cursor-pointer',
    header: 'flex gap-x-6 flex-row items-center justify-between pb-2',
    headingBox: 'flex flex-row items-center justify-between bg-[#f5f5f5] gap-x-2 border-[1px] border-[#e9e9e9] rounded-[4px] shadow-none px-1 py-[1px] w-fit',
    headingTitle: 'font-sans font-bold text-[13px] text-[#353535] my-auto',
    dataContainer: 'bg-[#e9e9e9] px-3 mt-5 border-[1px] border-[#e5e5e5]',
    dataList: 'flex flex-row items-center my-2 justify-between py-[7px] border-[1px] border-[#e5e5e5] bg-white px-3',
    itemDetails: 'my-auto font-sans font-semibold text-black',
    viewButton: 'edit-button px-[13px] py-[3px] rounded-[7px] text-white font-sans text-[13px] font-medium',
    deleteButton: 'delete-button px-[13px] py-[3px] rounded-[7px] text-white font-sans text-[13px] font-medium',
    singleInfo:'flex flex-col h-fit items-start -mb-2',
    itemLabel:'font-sans font-semibold text-[#404040] text-[14px] underline',
    itemInfo: 'ml-[7px] font-sans -mt-5 text-[#404040] font-normal text-[13px]',
    infoWrapper: 'flex flex-col w-[65%] px-4 h-fit',
    imageInfo: 'flex flex-row items-start overflow-hidden',
    URLsBlock: 'bg-sky-50 h-fit w-full h-fit px-4 pt-2 mt-3 border-[1px] border-sky-100',
    URLsTitle: 'bg-sky-200 w-fit px-2 py-[2px] border-[1px] border-[#c0c0c0] rounded-[8px] text-black font-sans font-semibold text-[14px]',
    URLsWrapper: 'flex flex-row items-start',
    URLIndex: 'font-semibold font-sans text-[#202020] text-[13px] mr-3',
    URL: 'font-sans hover:underline text-[14px] font-normal',
    buttonsWrapper: 'flex flex-row items-center justify-between mt-3',
    status: 'flex flex-row font-sans text-[16px] font-semibold text-[#252525]',
    statusVal: 'ml-1 text-[15px] mt-[1px]',
    buttonStyle: 'px-[9px] rounded-[5px] text-white font-sans font-medium mb-4'
}
export default styles;