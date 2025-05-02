class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T>  | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;

    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }

    find(value: T): boolean {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }

    private findMinValue(node: TreeNode<T>): T {
        let minValue = node.value;
        while (node.left) {
            minValue = node.left.value;
            node = node.left;
        }
        return minValue;
    }

    private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            
            // 1 потомок
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }

            // 2 потомка, "жертва" в правом поддереве
            node.value = this.findMinValue(node.right);
            node.right = this.deleteNode(node.right, node.value);
        }

        return node;
    }

    replace(value: T, newvalue: T): void {
        if (this.find(value)){
            this.delete(value);
            this.insert(newvalue);
        }
    }

    show(): void {
        const output: string[] = [];
        this.buildTreeOutput(this.root, "", true, output);
        console.log(output.join("\n"));
    }

    private buildTreeOutput(
        node: TreeNode<T> | null,
        prefix: string,
        isLeft: boolean,
        output: string[]
    ): void {
        if (!node) return;

        const rightPrefix = prefix + (isLeft ? "|   " : "    ");
        this.buildTreeOutput(node.right, rightPrefix, false, output);

        // текущий узел
        let nodeLine = prefix;
        if (isLeft) {
            nodeLine += "└──";
        } else {
            nodeLine += "┌──";
        }
        
        if (node.left || node.right) {
            nodeLine += "─";
        } else {
            nodeLine += " ";
        }
        
        nodeLine += node.value;
        output.push(nodeLine);

        const leftPrefix = prefix + (isLeft ? "    " : "|   ");
        this.buildTreeOutput(node.left, leftPrefix, true, output);
    }

    get_height(): number {
        return this.calcHeight(this.root);
    }

    private calcHeight(node: TreeNode<T> | null): number {
        if (!node) return 0;
        let leftHeight = this.calcHeight(node.left);
        let rightHeight = this.calcHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

const tree = new BinaryTree<number>();
let insert_array = [3, 1, 5, 2, 4, 6, 0, 10, 3.5, 2.7, 19, 11.2];
insert_array.forEach(element => {
    tree.insert(element);
});
console.log(`The tree has been created with inserted values of ${insert_array}`)