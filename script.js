// 等待整个 HTML 页面加载完成后再执行我们的代码
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 获取我们在 HTML 中创建的元素 ---
    // 我们需要操作这些元素，所以先把它们找出来存起来
    const textInput = document.getElementById('text-input');
    const processButton = document.getElementById('process-button');
    const readerContent = document.getElementById('reader-content');
    const definitionBox = document.getElementById('definition-box');

    // --- 2. 为“开始阅读”按钮添加点击事件 ---
    processButton.addEventListener('click', () => {
        // 获取用户在输入框里输入的文本
        const inputText = textInput.value;

        // 如果用户没有输入任何内容，就什么也不做
        if (!inputText.trim()) {
            readerContent.innerHTML = '<p>请输入一些文本内容。</p>';
            return;
        }

        // 清空上一次的阅读内容
        readerContent.innerHTML = '';

        // --- 核心逻辑：处理文本，让每个字都可点击 ---
        // a. 将文本分割成一个一个的字
        const characters = inputText.split('');

        // b. 遍历每一个字
        characters.forEach(char => {
            // c. 为每一个字创建一个 `<span>` 元素
            // `<span>` 是一个行内容器，很适合用来包裹单个字词
            const wordSpan = document.createElement('span');
            
            // d. 将字作为内容放进 `<span>`
            wordSpan.textContent = char;

            // e. 给这个 `<span>` 添加一个 CSS 类名，方便我们以后美化它
            wordSpan.className = 'word';

            // f. 将创建好的 `<span>` 添加到阅读区
            readerContent.appendChild(wordSpan);
        });
    });

    // --- 3. 为阅读区添加点击事件（事件委托） ---
    // 我们不给每个字单独添加点击事件，而是监听整个阅读区
    // 这样更高效，即使内容变化了也能正常工作
    readerContent.addEventListener('click', (event) => {
        // `event.target` 就是我们实际点击的那个元素
        const clickedElement = event.target;

        // 检查我们点击的是否是一个带有 'word' 类名的 `<span>`
        if (clickedElement.classList.contains('word')) {
            // 获取被点击的字
            const clickedWord = clickedElement.textContent;

            // 在侧边栏的单词详情框里显示这个字
            // 为了简单起见，我们暂时只显示这个字本身和它的拼音（模拟）
            definitionBox.innerHTML = `
                <h3>${clickedWord}</h3>
                <p><strong>拼音:</strong> pīn yīn (待实现)</p>
                <p><strong>释义:</strong> 这是对“${clickedWord}”的解释 (待实现)</p>
            `;
        }
    });

    // 为了让可点击的单词有更好的视觉反馈，我们添加一点点样式
    // 这段代码会在HTML的<head>中动态创建一个<style>标签
    const style = document.createElement('style');
    style.innerHTML = `
        .word {
            cursor: pointer; /* 鼠标悬停时显示手形 */
            padding: 2px;
            border-radius: 3px;
            transition: background-color 0.3s;
        }
        .word:hover {
            background-color: #e0f7fa; /* 悬停时淡蓝色高亮 */
        }
    `;
    document.head.appendChild(style);

});
