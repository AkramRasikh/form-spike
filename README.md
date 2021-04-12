## Commands

Run the app: yarn start

Run tests: yarn test

## Architecture:

The architecture is based on making the form scalable. The ‘fields’ folder
contains both the form information and the sidebar progress data which work in
tandem with each other as the user progresses through the journey.

The form component & sidebar components act as shells accepting props and have
no explicit reference to any specific data of the form.

If you want to extend the form, you create a form file i.e. ‘taxInfoForm’ and
fill in the required details accordingly. For example, a ‘Tax Paid’ field will
need, a ‘TextInput’, a label, helper text, etc. (react-hook-form docs for more
info)

## Form logic:

The logic specific to a form will need to be dealt with via a hook. In this
instance it is dealt with by the ‘use-form-handler’ hook.

The ‘use-form-handler’ hook calls the relevant APIs upon the getting user data
via submission (i.e. calling create payroll after receiving start date, salary &
userId).

Validation of the all forms can be extracted out into the
‘validation-helper-methods’ but I have opted to only use it for custom
functions.

## Tests:

With regards to testing, I tested the two possible end to end user journeys -
employee & non-employee - accounting for validation rules on the way.

## Future scalability & addressing the standout UX issue:

As mentioned in my UX section, I believe given the UI mock ups and the way in
which we invoke an API call upon each section, the user is forced to do the
entire form in one go. This is a clear UX problem and the easiest fix would be
to allow users to edit parts of the form and then submit their details in the
end.

To this point, the app can account for this scalability simply by converting the
sidebar containers into buttons and passing down ‘setStepForm’. This would allow
for the user to navigate between each section before submission.

## NOTE: (if I had more time!)

- Refactor out the setSidebarProgress into its own hook
- Tidy up the css files and classnames
- Make the site pretty like zelt.app
