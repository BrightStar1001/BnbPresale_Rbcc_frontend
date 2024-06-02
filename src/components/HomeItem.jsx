import { useResponsiveView } from "../utils/customHooks";

function HomeItem (props) {
  const limitSize = useResponsiveView(1020)

  return (
    <div className={"home-item m-auto flex flex-col grow items-center p-10 " + (limitSize?"w-full":"w-3/5")}>
      <div>
        <img src={props.image}/>
      </div>
      <div className="title text-center mt-5">{props.title}</div>
      <div className="divider my-5"></div>
      <div className="content">{props.content}</div>
      <div className="bg-gradient">
        <div></div>
      </div>
    </div>
  )
}

export default HomeItem; 