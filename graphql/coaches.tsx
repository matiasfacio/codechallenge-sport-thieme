import { gql } from "apollo-server-micro";

export const QUERY_ALL_COACHES = gql`
  query coaches($orderBy: [CoachOrderByWithRelationInput!]) {
    coaches(orderBy: $orderBy) {
      name
      id
    }
  }
`;

export const QUERY_ALL_COACHES_PAGINATION = gql`
  query ExampleQuery(
    $skip: Int
    $take: Int
    $orderBy: [CoachOrderByWithRelationInput!]
  ) {
    coaches(skip: $skip, take: $take, orderBy: $orderBy) {
      name
      id
    }
  }
`;

export const QUERY_ALL_COACHES_UNORDED = gql`
  query coaches {
    coaches {
      name
      id
    }
  }
`;

export const QUERY_ONE_COACH = gql`
  query ExampleQuery($where: CoachWhereUniqueInput!) {
    coach(where: $where) {
      id
      name
      email
      phone
      street
      streetNumber
      zip
      city
      website
      specialties {
        name
        id
      }
    }
  }
`;

export const QUERY_SPECIALTIES = gql`
  query Specialties {
    specialties {
      name
    }
  }
`;

export const MUTATION_DELETE_COACH = gql`
  mutation deleteCoach($where: CoachWhereUniqueInput!) {
    deleteCoach(where: $where) {
      name
      id
      email
    }
  }
`;

export const MUTATION_CREATE_COACH = gql`
  mutation CreateCoach($data: CoachCreateInput!) {
    createCoach(data: $data) {
      id
      name
      email
      phone
      street
      streetNumber
      zip
      city
      website
    }
  }
`;

export const MUTATE_COACH = gql`
  mutation UpdateCoach(
    $data: CoachUpdateInput!
    $where: CoachWhereUniqueInput!
  ) {
    updateCoach(data: $data, where: $where) {
      id
      name
      email
      phone
      street
      streetNumber
      zip
      city
      website
    }
  }
`;

export const MUTATE_ADD_COACH_TO_SPECIALTY = gql`
  mutation UpdateSpecialty(
    $data: SpecialtyUpdateInput!
    $where: SpecialtyWhereUniqueInput!
  ) {
    updateSpecialty(data: $data, where: $where) {
      id
      name
    }
  }
`;
