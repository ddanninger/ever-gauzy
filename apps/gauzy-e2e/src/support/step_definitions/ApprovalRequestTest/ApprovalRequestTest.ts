import * as loginPage from '../../Base/pages/Login.po';
import { LoginPageData } from '../../Base/pagedata/LoginPageData';
import * as approvalRequestPage from '../../Base/pages/ApprovalRequest.po';
import * as dashboardPage from '../../Base/pages/Dashboard.po';
import { ApprovalRequestPageData } from '../../Base/pagedata/ApprovalRequestPageData';
import { CustomCommands } from '../../commands';
import * as faker from 'faker';
import * as logoutPage from '../../Base/pages/Logout.po';
import * as manageEmployeesPage from '../../Base/pages/ManageEmployees.po';
import * as organizationTagsUserPage from '../../Base/pages/OrganizationTags.po';
import { OrganizationTagsPageData } from '../../Base/pagedata/OrganizationTagsPageData';

import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps';

const pageLoadTimeout = Cypress.config('pageLoadTimeout');

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let username = faker.internet.userName();
let password = faker.internet.password();
let employeeEmail = faker.internet.email();
let imgUrl = faker.image.avatar();

// Login with email
Given('Login with default credentials', () => {
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
});

// Add new tag
Then('User can add new tag', () => {
	CustomCommands.addTag(organizationTagsUserPage, OrganizationTagsPageData);
});

// Add new employee
And('User can add new employee', () => {
	CustomCommands.logout(dashboardPage, logoutPage, loginPage);
	CustomCommands.clearCookies();
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
	CustomCommands.addEmployee(
		manageEmployeesPage,
		firstName,
		lastName,
		username,
		employeeEmail,
		password,
		imgUrl
	);
});

// Add approval policy
Then('User can visit Employees approvals page', () => {
	CustomCommands.logout(dashboardPage, logoutPage, loginPage);
	CustomCommands.clearCookies();
	CustomCommands.login(loginPage, LoginPageData, dashboardPage);
	cy.visit('/#/pages/employees/approvals', { timeout: pageLoadTimeout });
});

And('User can see Approval policy button', () => {
	approvalRequestPage.approvalPolicyButtonVisible();
});

When('User click on Approval policy button', () => {
	approvalRequestPage.clickApprovalPolicyButton();
});

Then('User can see grid button', () => {
	approvalRequestPage.gridBtnExists();
});

And('User cn click on second grid button to change view', () => {
	approvalRequestPage.gridBtnClick(1);
});

And('User can see Add approval button', () => {
	approvalRequestPage.addApprovalButtonVisible();
});

When('User click on Add approval buton', () => {
	approvalRequestPage.clickAddApprovalButton();
});

Then('User can see name input field', () => {
	approvalRequestPage.nameInputVisible();
});

And('User can enter value for name', () => {
	approvalRequestPage.enterNameInputData(
		ApprovalRequestPageData.defaultApprovalPolicy
	);
});

And('User can see description input field', () => {
	approvalRequestPage.descriptionInputVisible();
});

And('User can enter value for description', () => {
	approvalRequestPage.enterDescriptionInputData(
		ApprovalRequestPageData.defaultpolicyDescription
	);
});

And('User can see save button', () => {
	approvalRequestPage.saveButtonVisible();
});

When('User click on save button', () => {
	approvalRequestPage.clickSaveButton();
});

Then('Notification message will appear', () => {
	approvalRequestPage.waitMessageToHide();
});

And('User can verify policy was created', () => {
	approvalRequestPage.verifyApprovalpolicyExists(
		ApprovalRequestPageData.defaultApprovalPolicy
	);
});

And('User can see back button', () => {
	approvalRequestPage.backButtonVisible();
});

When('User click on back button', () => {
	approvalRequestPage.clickBackButton();
});

// Add new approval request
Then('User can see grid button', () => {
	approvalRequestPage.gridBtnExists();
});

And('User can click on second grid button to change view', () => {
	approvalRequestPage.gridBtnClick(1);
});

And('User can see Add button', () => {
	approvalRequestPage.addApprovalButtonVisible();
});

When('User click on Add button', () => {
	approvalRequestPage.clickAddApprovalButton();
});

Then('User can see approval name input field', () => {
	approvalRequestPage.nameInputVisible();
});

And('User can enter value for approval name', () => {
	approvalRequestPage.enterNameInputData(ApprovalRequestPageData.dafaultName);
});

And('User can see min count input field', () => {
	approvalRequestPage.minCountInputVisible();
});

And('User can enter value for min count', () => {
	approvalRequestPage.enterMinCountInputData(
		ApprovalRequestPageData.defaultMinCount
	);
});

And('User can see approval policy dropdown', () => {
	approvalRequestPage.approvalPolicyDropdownVisible();
});

When('User click on approval policy dropdown', () => {
	approvalRequestPage.clickApprovalPolicyDropdown();
});

Then('User can select policy from dropdown options', () => {
	approvalRequestPage.selectApprovalPolicyOptionDropdown(
		ApprovalRequestPageData.defaultApprovalPolicy
	);
});

And('User can see employee dropdown', () => {
	approvalRequestPage.selectEmployeeDropdownVisible();
});

When('User click on employee dropdown', () => {
	approvalRequestPage.clickSelectEmployeeDropdown();
});

Then('User can select employee from dropdown options', () => {
	approvalRequestPage.selectEmployeeFromDropdown(0);
	approvalRequestPage.clickKeyboardButtonByKeyCode(9);
});

And('User can see save approval button', () => {
	approvalRequestPage.saveButtonVisible();
});

When('User click on save approval button', () => {
	approvalRequestPage.clickSaveButton();
});

Then('Notification message will appear', () => {
	approvalRequestPage.waitMessageToHide();
});

And('User can verify request was created', () => {
	approvalRequestPage.verifyRequestExists(
		ApprovalRequestPageData.dafaultName
	);
});

// Edit approval request
When('User can select first table row', () => {
	approvalRequestPage.selectTableRow(0);
});

Then('Edit request button will become active', () => {
	approvalRequestPage.editApprovalRequestButtonVisible();
});

When('User click on edit approval request button', () => {
	approvalRequestPage.clickEditApprovalRequestButton();
});

Then('User can see name input field', () => {
	approvalRequestPage.nameInputVisible();
});

And('User can enter new value for name', () => {
	approvalRequestPage.enterNameInputData(ApprovalRequestPageData.editName);
});

And('User can see min count input field', () => {
	approvalRequestPage.minCountInputVisible();
});

And('User can enter new value for min count', () => {
	approvalRequestPage.enterMinCountInputData(
		ApprovalRequestPageData.defaultMinCount
	);
});

And('User can see save button', () => {
	approvalRequestPage.saveButtonVisible();
});

When('User click on save button', () => {
	approvalRequestPage.clickSaveButton();
});

Then('Notification message will appear', () => {
	approvalRequestPage.waitMessageToHide();
});

And('User can verify request was edited', () => {
	approvalRequestPage.verifyRequestExists(ApprovalRequestPageData.editName);
});

// Delete approval request
When('User select first table row', () => {
	approvalRequestPage.selectTableRow(0);
});

Then('Delete request button will become active', () => {
	approvalRequestPage.deleteApprovalRequestButtonVisible();
});

When('User click on delete request button', () => {
	approvalRequestPage.clickDeleteApprovalRequestButton();
});

Then('Notification message will appear', () => {
	approvalRequestPage.waitMessageToHide();
});

And('User can verify request was deleted', () => {
	approvalRequestPage.verifyElementIsDeleted();
});
