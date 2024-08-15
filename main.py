from graphviz import Digraph

# Create a new directed graph
dot = Digraph()

# Define the entities with their attributes
dot.node('User', 'User\n- userID (PK)\n- name\n- email\n- role')
dot.node('Appointment', 'Appointment\n- appointmentID (PK)\n- date\n- time\n- status\n- userID (FK)')
dot.node('VideoCall', 'VideoCall\n- callID (PK)\n- startTime\n- endTime\n- appointmentID (FK)')

# Define the relationships
dot.edge('User', 'Appointment', label='1:N')
dot.edge('Appointment', 'VideoCall', label='1:1')

# Render the diagram
dot.render('/mnt/data/astro_janak_er_diagram', format='png', cleanup=True)

'/mnt/data/astro_janak_er_diagram.png'