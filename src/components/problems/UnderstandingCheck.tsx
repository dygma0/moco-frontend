import { Icon } from "../ui/Icon";

export function UnderstandingCheck() {
  return (
    <div className="lg:w-2/5 h-[calc(100vh-180px)]">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#eaeaea] bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-[#333]">Understanding Check</h2>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-xs text-[#c28b3b]">Skip to Lesson</button>
          </div>
          <div className="flex items-center mt-2">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-[#666]">Questions remaining: 1</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#f8f8f6]">
          <div className="mb-4 pr-4">
            <div className="flex items-start mb-2">
              <div className="h-8 w-8 rounded-full bg-[#c28b3b] flex items-center justify-center text-white mr-2">AI</div>
              <div className="text-xs text-[#888] mt-2">12:44 AM</div>
            </div>
            <div className="rounded-lg p-4 bg-black text-white ml-10">주어진 2D 행렬에 대해서 설명에서 오른쪽으로 위에서 아래로 누적 합을 구한 결과 지점별 배열을 추가로 구성한 뒤 특정 구간의 사각형 내부의 합을 O(1)으로 구할 수 있을 것 같습니다.</div>
          </div>
          <div></div>
        </div>

        <div className="p-4 border-t border-[#eaeaea] bg-white">
          <div className="flex items-center">
            <textarea placeholder="Type your message here..." className="flex-1 resize-none border border-[#e0e0e0] rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#c28b3b] focus:border-[#c28b3b] min-h-[60px]"></textarea>
            <button className="gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground ml-2 h-10 w-10 rounded-full bg-[#c28b3b] hover:bg-[#a67a2e] p-0 flex items-center justify-center">
              <Icon id="send" title="Send message" className="h-5 w-5 text-white">
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                <path d="m21.854 2.147-10.94 10.939"></path>
              </Icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
