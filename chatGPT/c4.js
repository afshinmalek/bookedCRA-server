
class Node (){
  constructor(goal){
    this.goal = goal;
    this.children = [];
    this.tests=[];
    this.error=[];
    this.file = "",
  }
  add(node){
    this.children.push(node)
  }
  
  askGpt() {

    //this prompt will act as a base case 
    // is this goal small enough 

    
    let prompt = `Break down ${this.goal} into smaller tasks.`;
    // Use OpenAI API to interact with ChatGPT and generate smaller tasks
    // Replace this with your actual OpenAI integration code
    const generatedTasks = ["Task 1", "Task 2", "Task 3"];
    generatedTasks.forEach((task) => {
      const childNode = new Node(task);
      this.add(childNode);
    });
  }
}


class Tree(){
  constructor(root){
    this.root = new Node(root);
  }
}


// modify the code so it uses this updated instruction
// use these technologies : vscode text editor, node,js, react, express,vscode error messages, google chrome browser errors console, any npm package you like
// i want to build a MERN stack app , that follows these steps to build a web app
// 1- let goal = the prompt ; app gets a prompt from an input field as its goal
// 1.1- create a root node; webTree = new Tree(goal);
// 2- create steps = [ ] and fill the children array of each step/node; it will breakdown the goal to smaller steps, parts , files and folders, it should use open AI api to ask chat gpt to : breakdown goal into smaller steps/goals until the step is so small that ,you can write it in a single functionality function, add all steps to steps array,each step of steps is a Node ; this is an example of steps array ; steps = [{goal: "",children :[]},{goal:"",children:[]},...];
// 2.1-ask open AI's chat gpt: can we get to our goal if we follow the steps in steps ,if we can ,go to the next step, if not, you can modify the steps so each step can be achieved by writing a small function
// 3- create tests = [ ]; test cases , that it would be useful to see if the app is functional,it should use open AI api to ask chat gpt to : create tests for each step of steps to make sure app is functional and add it to steps obj , it should look like this : steps = [{goal: "",children:[],tests:[{test1: //some function},{test2: //another function}]},{goal:"",children:[],tests:[{test1: //some function},{test2: //another function}]},...]
// 4-create files = [ ];  based on step.goal and step.tests , build the files / functionalities to achieve goal and pass all the tests ,it should use open AI api to ask chat gpt to : create a function/file that passes the tests and achieve the goal of the step , it should look like this :  
// 5- run the code
// 6- based on errors, modify the code to achieve the goal of the task on hand,it should use open AI api to ask chat gpt to : modify the code based on errors so it achieve its goal
// 7-  keep doing #5 and #6 till no errors



