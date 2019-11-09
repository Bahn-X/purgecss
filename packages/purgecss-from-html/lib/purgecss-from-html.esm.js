import parse5 from 'parse5';
import * as htmlparser2 from 'parse5-htmlparser2-tree-adapter';

const getSelectorsInElement = (element) => {
    const selectors = [];
    const tagName = element.name;
    // add class names
    if (element.attribs.class) {
        selectors.push(...element.attribs.class.split(" "));
    }
    // add ids
    if (element.attribs.id) {
        selectors.push(...element.attribs.id.split(" "));
    }
    return [...getSelectorsInNodes(element), ...selectors, tagName];
};
const getSelectorsInNodes = (node) => {
    const selectors = [];
    for (const childNode of node.children) {
        const element = childNode;
        switch (element.type) {
            case "tag":
                selectors.push(...getSelectorsInElement(element));
                break;
            case "root":
                selectors.push(...getSelectorsInNodes(element));
                break;
        }
    }
    return selectors;
};
const purgecssFromHtml = (content) => {
    const tree = parse5.parse(content, {
        treeAdapter: htmlparser2
    });
    return getSelectorsInNodes(tree);
};

export default purgecssFromHtml;
