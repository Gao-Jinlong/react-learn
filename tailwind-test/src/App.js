import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="ginlon-text-base ginlon-p-1 ginlon-border ginlon-border-black ginlon-border-solid">
        全局样式 通过 tailwind.config.js 配置 theme.extend
      </div>
      <div className="ginlon-text-[24px] hover:ginlon-text-[30px]">
        局部样式
      </div>
      <div className="ginlon-bg-red-500 md:ginlon-bg-blue-500 ginlon-text-[14px] hover:ginlon-text-[30px]">
        响应式 断点位置通过 tailwind.config.js 配置 theme.screens
      </div>
      <div className="btn-primary">
        @layer 在某个层级中定义样式 @apply 使用已定义的样式
      </div>
      <div className="ginlon-ginlon ginlon-ginlon-font">
        插件实现跨项目的样式复用
      </div>
    </>
  );
}

export default App;
