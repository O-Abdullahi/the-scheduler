// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Scheduler {
    struct Task {
        string description;
        bool completed;
    }

    // The tasks should be stored in an array
    Task[] public tasks;

    // Then we need a function to add a task
    function addTask(string memory _description) public {
        Task memory newTask = Task(_description, false);
        tasks.push(newTask);
    }

    // returns the array

    function getTask() public view returns(Task[] memory){
        return tasks;
    }

    // To mark a task as completed
    function completeTask(uint _index) public {
        Task storage task = tasks[_index];
        task.completed = true;
    }

    // To remove a task
    function removeTask(uint _index) public {
        // Delete the task
        delete tasks[_index];

        // Reorder the array to remove the empty space
        // created by deleting the task
        uint length = tasks.length;
        for (uint i = _index; i < length - 1; i++) {
            tasks[i] = tasks[i + 1];
        }

        // Decrease the array size by 1
      
	    tasks.pop();
    }

}