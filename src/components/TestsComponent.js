import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import AddModuleDialog from './AddModuleDialog';
import AddProjectDialog from './AddProjectDialog';
import AddTestDialog from './AddTestDialog';
import DatagridSample from './DatagridSample';

const TestsComponent = () => {

    const [projects, setProjects] = useState([]);

    const [selectedProject, setSelectedProject] = React.useState('');

    const [modules, setModules] = useState([]);

    const [selectedModule, setSelectedModule] = useState('');

    const [tests, setTests] = useState([]);

    const [selectedTest, setSelectedTest] = useState('');

    const [subTests, setSubTests] = useState([])


    const fetchProjects = () => {
        axios.get("http://localhost:8081/allProjects")
            .then((response) => setProjects(response.data))
            .catch((error) => console.log(error))
    }

    const fetchModulesUnderProject = (projectId) => {
        axios.get(`http://localhost:8081/project/modules/${projectId}`)
            .then((response) => setModules(response.data))
            .catch((error) => console.log(error))
    }

    const handleProjectChange = (event) => {
        const projectId = event.target.value
        setSelectedProject(projectId)
        fetchModulesUnderProject(projectId)
    }

    const fetchTestsUnderModule = (moduleId) => {
        axios.get(`http://localhost:8081/tests/${moduleId}`)
            .then((response) => setTests(response.data))
            .catch((error) => console.log(error))
    }

    const handleModuleChange = (event) => {
        const moduleId = event.target.value
        setSelectedModule(moduleId)
        fetchTestsUnderModule(moduleId)
    }

    const fetchDataUnderTest = (testId) => {
        axios.get(`http://localhost:8081/keyword/subTests/${testId}`)
            .then((response) => setSubTests(response.data))
            .catch((error) => console.log(error))
    }

    const handleTestChange = (event) => {
        const testId = event.target.value
        setSelectedTest(testId)
        fetchDataUnderTest(testId)
    }

    const handleModule = () => {
        document.getElementById("moduleSelect").classList.remove("hidden")
    }

    const handleTest = () => {
        document.getElementById("testSelect").classList.remove("hidden")
    }

    const handleDataGrid = () => {
        document.getElementById("datagridSelect").classList.remove("hidden")
    }


    return (
        <Box sx={{ width: '100%', display: 'flex', gap: 3 }}>
            <Box sx={{ width: '20%', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: 3 }} >

                <Box id='projectSelect' sx={{ display: "flex" }} >
                    <AddProjectDialog />
                    <FormControl fullWidth>
                        <InputLabel id="project-selection">Project</InputLabel>
                        <Select
                            labelId="project-selection"
                            id="select-project"
                            value={selectedProject}
                            label="project"
                            onChange={handleProjectChange}
                            type='text'
                            onFocus={fetchProjects}
                        >
                            {projects.map((project) => (
                                <MenuItem
                                    key={project.projectId}
                                    value={project.projectId}
                                    onClick={handleModule}
                                >
                                    {project.projectName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>


                <div id='moduleSelect' className="hidden">
                    <Box sx={{ display: 'flex' }}>
                        <AddModuleDialog
                            selectedProject={selectedProject}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="module-selection">Module</InputLabel>
                            <Select
                                labelId="module-selection"
                                id="select-module"
                                value={selectedModule}
                                label="module"
                                onChange={handleModuleChange}
                            >
                                {modules.map((module) => (
                                    <MenuItem
                                        key={module.moduleId}
                                        value={module.moduleId}
                                        onClick={handleTest}
                                    >
                                        {module.moduleName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>


                <div id='testSelect' className='hidden'>
                    <Box sx={{ display: 'flex' }}>
                        <AddTestDialog
                            selectedModule={selectedModule}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="test-selection">Test</InputLabel>
                            <Select
                                labelId="test-selection"
                                id="select-test"
                                label="test"
                                value={selectedTest}
                                onChange={handleTestChange}
                            >
                                {tests.map((test) => (
                                    <MenuItem
                                        key={test.testId}
                                        value={test.testId}
                                        onClick={handleDataGrid}
                                    >
                                        {test.testName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </Box>

            <div id='datagridSelect' className='hidden'>
                <DatagridSample
                    subTests={subTests}
                    setSubTests={setSubTests}
                    selectedTest={selectedTest}
                    fetchDataUnderTest={fetchDataUnderTest}
                />
            </div>
        </Box>
    );
};

export default TestsComponent
