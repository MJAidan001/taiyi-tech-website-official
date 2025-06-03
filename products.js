// 产品数据
const products = [
    {
        id: 1,
        name: '太一AI助手',
        description: '基于先进的情感计算技术，提供个性化的AI对话体验',
        price: 299,
        features: [
            '情感识别与回应',
            '个性化对话定制',
            '多场景应用支持',
            '7x24小时在线服务'
        ],
        image: 'images/ai-assistant.svg'
    },
    {
        id: 2,
        name: '太一情感分析引擎',
        description: '企业级情感分析解决方案，助力企业深入理解用户需求',
        price: 999,
        features: [
            '多维度情感分析',
            'API接口支持',
            '实时数据处理',
            '可视化报表'
        ],
        image: 'images/emotion-engine.svg'
    }
];

// 获取产品列表
function getProducts() {
    return products;
}

// 根据ID获取产品详情
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// 格式化价格显示
function formatPrice(price) {
    return `￥${price.toFixed(2)}`;
}

// 导出函数
export {
    getProducts,
    getProductById,
    formatPrice
};